// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract EcoRewardSystem {
    
    // Structure représentant une action écologique
    struct Action {
        uint id;                          // Identifiant unique de l'action
        address payable proposer;                 // Adresse du proposeur de l'action
        string description;               // Description de l'action
        uint voteCount;                   // Nombre de votes reçus
        bool validated;                   // Indicateur de validation de l'action
        address[] voters;                 // Liste des votants pour cette action
    }

    address public admin;  
  
    // Compteur d'actions et seuil de votes pour validation
    uint public actionCounter = 0;
    uint constant public VOTE_THRESHOLD = 3;
    // Mapping des actions : actionId => Action
    mapping(uint => Action) public actions;
    
    // Suivi des votes : actionId => adresse du votant => a voté
    mapping(uint => mapping(address => bool)) public votes;  

    // Événement pour notifier la validation d'une action
    event ActionValidated(uint id, string description, address proposer);
    
    // Événement pour notifier la rémunération des votants
    event VoterPaid(address indexed voter, uint amount);

    // Initialisation du contrat avec l'adresse de l'administrateur
        constructor() {
            admin = msg.sender;
        }

    // Fonction pour proposer une action écologique
    function proposeAction(string memory description , address payable _address) public {
        actionCounter++;
        address[] memory emptyArray; // Initialize an empty array for voters
        
        actions[actionCounter] = Action({
            id: actionCounter,
            proposer: _address,
            description: description,
            voteCount: 0,
            validated: false,
            voters: emptyArray
        });
    }

    // Fonction pour voter pour une action
    function voteForAction(uint actionId, address payable _address) public {
        require(_address != admin , "The admin cannot vote");
        require(actions[actionId].id != 0, "Action does not exist"); // Vérifier l'existence de l'action
        require(!votes[actionId][_address], "You have already voted for this action"); // Assurer que l'utilisateur n'a pas déjà voté
        require(!actions[actionId].validated, "Action is already validated"); // Vérifier que l'action n'est pas déjà validée

        // Enregistrer le vote
        votes[actionId][_address] = true;
        actions[actionId].voteCount++;
        actions[actionId].voters.push(_address); // Ajouter l'adresse du votant

        // Si l'action reçoit suffisamment de votes, elle est validée
        if (actions[actionId].voteCount >= VOTE_THRESHOLD) {
            actions[actionId].validated = true;
            emit ActionValidated(actionId, actions[actionId].description, actions[actionId].proposer);
        }
    }

 
    // Fonction pour rémunérer les votants et le proposeur après validation
    function payVotersAndProposer(uint actionId) public {
        require(actions[actionId].validated, "Action not yet validated");
        uint  rewardAmount = 0.00005 ether; // Montant de la récompense pour chaque votant (exemple : 1.5 ether)
        uint  rewardAmountVoters = 0.00002 ether; // Montant de la récompense pour chaque votant (exemple : 1 ether)
    
        uint totalAmount = rewardAmount + rewardAmountVoters * (actions[actionId].voters.length + 1); // Total à payer (votants + proposeur)

        require(address(this).balance >= totalAmount , "Solde insuffisant" );

        // Rémunérer le proposeur
        payable(actions[actionId].proposer).transfer(rewardAmount);

        emit VoterPaid(actions[actionId].proposer, rewardAmount);

        // Rémunérer chaque votant
        for (uint i = 0; i < actions[actionId].voters.length; i++) {
            address voter = actions[actionId].voters[i];
            payable(voter).transfer(rewardAmountVoters);
            emit VoterPaid(voter, rewardAmountVoters);
        }
    }

          // Fonction pour obtenir la liste de toutes les actions
    function AllActionsList() public view returns (Action[] memory) {
        Action[] memory allActions = new Action[](actionCounter);
        for (uint i = 1; i <= actionCounter; i++) {
            allActions[i - 1] = actions[i];
        }
        return allActions;
    }

    // Fonction pour obtenir les détails d'une action par son identifiant
    function ActionsByActionId(uint actionId) public view returns (Action memory) {
        require(actions[actionId].id != 0, "Action does not exist"); // Vérifier l'existence de l'action
        
        return actions[actionId];
    }

    function VotesByActionId(uint actionId) public view returns (address[] memory) {
        require(actions[actionId].id != 0, "Action does not exist"); // Vérifier l'existence de l'action
       
        return actions[actionId].voters; // Retourner la liste des votants pour l'action
    }

        // Fonction pour obtenir les actions votées par une adresse spécifique
    function VotesByAdresse(address voter) public view returns (uint[] memory) {
        uint[] memory votedActions = new uint[](actionCounter); // Tableau pour stocker les identifiants des actions votées
        uint count = 0; // Compteur pour le nombre d'actions votées

        for (uint i = 1; i <= actionCounter; i++) {
            if (votes[i][voter]) {
                votedActions[count] = i; // Ajouter l'identifiant de l'action votée
                count++;
            }
        }

        // Ajuster la taille du tableau au nombre d'actions votées
        uint[] memory result = new uint[](count);
        for (uint j = 0; j < count; j++) {
            result[j] = votedActions[j];
        }
        return result;
    }

    // Permet au contrat de recevoir des ethers
    receive() external payable {}
}
