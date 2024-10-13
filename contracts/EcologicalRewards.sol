// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract EcologicalRewardsSystem {
    
    // Structure pour représenter une action écologique
    struct Action {
        uint actionId;         // Identifiant unique de l'action
        string description;    // Description de l'action
        uint rewardPoints;     // Points associés à l'action
        bool isValidated;      // État de validation de l'action
        address user_address;   
    }

    // Variables globales
    mapping(address => uint) public rewardsBalance;        // Solde des tokens pour chaque utilisateur
    mapping(address => Action[]) public userActions;       // Actions soumises par chaque utilisateur
    address public admin;                                   // Adresse de l'administrateur

    // Compteur pour générer des IDs d'action
    uint private actionCounter;

    // Événements pour informer des changements
    event ActionDeclared(address indexed user, uint actionId, string description, uint points);
    event ActionValidated(address indexed user, uint indexed actionId, uint rewardPoints);
    event TokensRedeemed(address indexed user, uint amount);
    event RewardsBalanceUpdated(address indexed user, uint newBalance);

    // Initialisation du contrat avec l'adresse de l'administrateur
    constructor() {
        admin = msg.sender;
    }

    // Fonction pour déclarer une action écologique
    function declareAction(string memory description, uint points , address payable _address) public {
        actionCounter++; // Incrémente le compteur pour générer un nouvel ID
        Action memory newAction = Action({
            actionId: actionCounter,
            description: description,
            rewardPoints: points,
            isValidated: false,
            user_address: _address
        });
        
        userActions[_address].push(newAction); // Ajoute l'action à la liste des actions de l'utilisateur
        emit ActionDeclared(_address, actionCounter, description, points); // Émet un événement
    }

    // Fonction pour valider une action écologique
    function validateAction(address user, uint actionIndex) public {
        require(msg.sender == admin, "Seul l'administrateur peut valider les actions.");
        
        Action storage action = userActions[user][actionIndex];
        require(!action.isValidated, "Cette action est deja valide.");

        action.isValidated = true; // Valide l'action
        rewardsBalance[user] += action.rewardPoints; // Ajoute les points de récompense au solde de l'utilisateur
        
        emit ActionValidated(user, action.actionId, action.rewardPoints); // Émet un événement
        emit RewardsBalanceUpdated(user, rewardsBalance[user]); // Met à jour le solde de l'utilisateur
    }

    // Fonction pour consulter le solde de récompenses
    function checkRewardsBalance(address _address) public view returns (uint) {
        return rewardsBalance[_address];
    }

    // Fonction pour échanger des tokens
    function redeemTokens(uint amount , address _address) public {
        require(rewardsBalance[_address] >= amount, "Solde insuffisant.");
        
        rewardsBalance[_address] -= amount; // Déduit les tokens du solde
        emit TokensRedeemed(_address, amount); // Émet un événement
        emit RewardsBalanceUpdated(_address, rewardsBalance[_address]); // Met à jour le solde
    }

    // Fonction pour récupérer les actions d'un utilisateur
    function getUserActions(address user) public view returns (Action[] memory) {
        return userActions[user];
    }
}