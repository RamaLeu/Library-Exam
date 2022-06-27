const RegModel = require("./../models/registrationModel");

exports.loginUser = async(req, res) =>{
    const userExists = await RegModel.exists({ email: req.body.email });
    if (userExists){
    RegModel.findOne({ email: req.body.email },function (err, person) {
        console.log(person);
        res.status(201).json({
            status: "Success",
            user: person
        });
      });
    }else{
        res.status(404).json({
            status: "Fail"
        });
    }
}

exports.loginSavedUser = async(req, res)=>{
    console.log(req.body.id)
    RegModel.findOne({ _id: req.body.id },function (err, person) {
        console.log(person);
        res.status(201).json({
            status: "Success",
            user: person
        });
    })
}

    /* if (!userExists){
        try{
            res.status(201).json({
                status: "success",
                data: {
                    user: newUser
                    
                },
            });
        } catch(err){
            res.status(400).json({
                status: "fail",
                message: err,
            })
        }
    }else{
        res.status(401).json({
            status: "fail",
            message: "user already exists"
        })
    } */