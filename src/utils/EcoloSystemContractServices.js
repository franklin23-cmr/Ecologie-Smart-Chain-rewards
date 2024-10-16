
export const proposeAction = async (provider,contract, address_proposer ,description ,greencoin) => {
    if (contract && address_proposer && description) {
        try {

           const tx = await contract.proposeAction(description, address_proposer,greencoin);
           await tx.wait();
           
        } catch (error) {
            console.error("Error proposing action -----:", error);

            throw new Error(error)
        } 
    } else {
        alert("Please provide a description for the action.");
    }
};

export const voteForAction = async (contract, actionId,userAddress) => {

        if (!contract) return;
        try {
            const tx = await contract.voteForAction(actionId, userAddress);
            await tx.wait(); // Attendre la confirmation de la transaction
            alert('Vote enregistré avec succès !');
        } catch (error) {
            console.error(error);
            alert(`Erreur lors du vote, ${error}`);
        }
 
};


export const payVoters = async (contract,actionId,amount,address) => {
    if (!contract) return;

    try {
        const tx = await contract.payVotersAndProposer(actionId, address, amount)
        await tx.wait(); // Attendre la confirmation de la transaction
        alert('Votants et proposeur rémunérés avec succès !');
    } catch (error) {
        console.error(error);
        alert('Erreur lors de la rémunération.');
    }
};

export const getActionDetails = async (contract, actionId) => {
    if (!contract) return;

    try {
        console.log('id',actionId )
        const actionDetails = await contract.ActionsByActionId(actionId)        
        return  actionDetails
    } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'action:", error);
    }
};

// Fonction pour obtenir les votants d'une action par son identifiant
export const getVotersByActionId = async (contract, actionId) => {
    if (!contract) return;

    try {
        const actionVoters = await contract.VotesParActionId(actionId);
        
        return actionVoters

    } catch (error) {
        console.error("Erreur lors de la récupération des votants:", error);
    }
};

export const getAllActions = async (contract) => {
    if (!contract) return;

    try {
        const actionsList = await contract.AllActionsList();
        return actionsList 
    } catch (error) {
        console.error("Erreur lors de la récupération des actions:", error);
    }
};

   // Fonction pour obtenir les actions votées par une adresse spécifique
   export const getVotedActionsByAddress = async (contract , voterAddress) => {
    if (!contract) return;

    try {
        const actions = await contract.VotesParAdresse(voterAddress);
        return actions
    } catch (error) {
        console.error("Erreur lors de la récupération des actions votées:", error);
    }
};


export const checkRewardsBalance = async (contract , address) => {
    try {

      const balance = await contract.checkRewardsBalance(address);
      return Number(balance)
      
    } catch (error) {
      console.error("Erreur lors de la récupération du solde :", error);
    }
  };