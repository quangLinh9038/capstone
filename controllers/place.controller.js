const Place = require('../models/place');

const PlaceController = {
    getAllPlaces: async(req, res) => {
        try{
            const allPlaces = await Place.findAll();
            if(allPlaces > 0){
                res.json(allPlaces);
            }
            return res.status(404).json({msg: "Empty list!"})

        } catch (err){
            return res.status(500).json({msg: err.message})
        }
    },

    createPlace: async(req, res) => {
        try{    
            const {name} = req.body;
            const place = await Place.findOne({where: {name: String(name)}});

            if(place){
                return res.status(400).json({msg: "Place already exists"})
            }

            const newPlace = new Place({name});
            await Place.create(newPlace);


        } catch (err){
            return res.status(500).json({msg: err.message})
        }
    },

    deletePlace: async(req,res) => {
        try{
            const placeToDelete = new Place.findOne({where: {name: String(name)}});

            if (placeToDelete) {
                const deletedPlace = await Place.destroy({where: {name: String(name)}})
                return res.status(200).json(deletedPlace, {msg:"Deleted a category"});
            };

            return placeToDelete;
        
        } catch (err){
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = PlaceController;