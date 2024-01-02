const express = require("express");
//const User = require("../models/User");
const Election = require ("../models/Election")
const Cookies = require('js-cookie')
const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt')


//register seller
const electioncreation= async (req, res) => {
    // Helper function to generate a random 7-letter alphanumeric word
    User = req.user
    console.log('user',User)
    try {
     
    
     
  
      const election = new Election({
        ...req.body,
        createdby: User.id,
      });

      // Save the user to the database
      await election.save();
  
      console.log('Election created');
     
      res.status(201).send({ election});
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };



const electionlist = async(req,res)=>{
    const User = req.user
    const Userid = User.id
    try {
        const elections= await Election.find({ createdby: Userid})
       // console.log('elections',elections)
        res.send({elections});
    } catch (error) {
        
    }
}

const voterelectionlist =  async(req,res)=>{
  const User = req.user
 // console.log('user',User)
  const voterId = User.voterID
 // console.log(voterId)
  try {
    const elections = await Election.find({
      voters: {
        $elemMatch: {
          $eq: voterId,
        },
      },
    });
      console.log('elections',elections)
      res.send({elections});
  } catch (error) {
      
  }
}

const electiondata = async(req,res)=>{
  try {
    // Find the election by ID
    const { electionId } = req.params;
   
    const election = await Election.findById(electionId);


    if (!election) {
      throw new Error('Election not found');
    }

    // Get the number of voters and candidates
    const numVoters = election.voters.length;
    const numCandidates = election.candidates.length;
    let  Numbers = [numVoters,numCandidates]
   
    // Return the results
    res.send(Numbers);
  } catch (error) {
    console.error('Error getting election stats:', error.message);
    throw error;
  }
}




module.exports = {electioncreation,electionlist , voterelectionlist, electiondata}