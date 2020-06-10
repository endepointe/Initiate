Create a voting app. Teamwork makes the dream work.

The app will be able to allow a pool of registered 
users the ability to vote on a subject.Voting would 
then be cut-off at a specific time.


1) authentication
	
		- JWT and crypto.
    - follow: https://expressjs.com/en/advanced/best-practice-security.html


2) database for logging voters, votes, and subjects

		- the voters and their votes.
		- the subject being voted on and the voters 
			who participated.
		
	The subject table/model will tally the votes 
	based on the relation between table 
	and votes.

	When voting is complete, the votes will be 
	displayed, along with each voter in their
	corresponding vote column.


3) design
	
		- users should only come here to do one 
			thing, vote.
		- a form is really all that is needed
		- a description of the topic will be given
			after authentication.

-----------------------------------------------------------
-----------------------------------------------------------


to run the application:

  Install the dependencies in the final and server 
  directories. Check the package.json files
  accordingly. Install the nodemon package as a 
  dev dependency using " npm install --save-dev "
  instead of just " --save "

  Then ...

  To test production:

    change to final/client directory and run:
    
      npm run build


  Once complete:

    Change to the server directory and run:
  
      npm run dev


apis will be tested with Postman.

