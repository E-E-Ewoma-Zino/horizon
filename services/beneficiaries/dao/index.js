const Beneficiary = require("../schema/Beneficiary");


async function createBeneficiary(data) {
    const newBeneficiary = new Beneficiary(data);
    try{
        const saved = await newBeneficiary.save();
        return res.status(200).json(saved);
    } catch(err){
        return res.status(500).json(err);
    }
    
}

async function getBeneficiaryById(id){
    try{
        const beneficiary = await Beneficiary.findById(id);
        return res.status(200).json(Beneficiary);
    } catch (err){
        return res.status(500).json(err);
    }
}

async function updateBeneficiaryById(id, data){
    try{
        const updateBeneficiary = await Beneficiary.findByIdAndUpdate(id, {data}, {new: true});
        return res.status(200).json(updateBeneficiary);
    } catch (err){
        return res.status(500).json(err);
    }
}

async function deleteBeneficiaryById(id){
    try{
        const deleteBeneficiary = await Beneficiary.findByIdAndDelete(id);
        return res.status(200).json(deleteBeneficiary);
    } catch(err){
        return res.status(500).json(err);
    }
}

async function getAllBenefitiaryPerUser(user_id){
    try{
        const getBeneficiary = await Benefitiary.getBy(user_id);
        return res.status(200).json(getBeneficiary);
    } catch(err){
        return res.status(500).json(err);
    }
}


module.exports = {
    createBeneficiary,
    getAllBenefitiaryPerUser,
    getBeneficiaryById,
    deleteBeneficiaryById,
    updateBeneficiaryById,
}