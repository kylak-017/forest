import moment from 'moment';

document.addEventListener('DOMContentLoaded', function() {
    const start_btn = document.getElementById("start-button");
    const emailSection = document.getElementById("email");
    const emailVal = document.getElementById("email-input");
    const vision_btn = document.getElementById("vision-button");

    const intro = document.getElementById("intro");
    const quotesContainer = document.getElementById("quotes");
    const reviewRules = document.getElementById("review-rules");
    const vision = document.getElementById("vision");

    const moveOn_btn = document.getElementById("move-on-button");

   if (emailSection && moveOn_btn) {
        emailSection.style.display = "block"; //show the email section
        moveOn_btn.style.display = "block";
    }


    let emailValue;
    


    if(moveOn_btn){
        moveOn_btn.addEventListener("click", async () => {

            emailValue = emailVal.value;
            console.log(emailValue);


            //does user exist?
            try{
                const userExist = await fetch("http://localhost:3200/user-id", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailValue //submitting this to the server, seeing if there are any matching emails
                    }),
                });

                let userId;
                const checkData = await userExist.json(); //is that user there with that email?

                //exists
                if (userExist.ok && checkData.userId) {
                    userId = checkData.userId; //get the id of the user (used in the doc)
                    console.log("User found with ID:", userId);

                    const streakUpdate = await fetch(`http://localhost:3200/users/${userId}/add-streak`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: emailValue,
                        })
                    });

                    if (streakUpdate.ok) {
                        const data = await streakUpdate.json();
                        console.log("Streak updated successfully:", data);
                    } else {
                        console.error("Error!");
                    }

                } //if user doesnt exist
                else {

                const response = await fetch("http://localhost:3200/users", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailValue,
                        streak: 0, //init
                        completedTasks:0,
                        priority: 0,
                        completed: false
                    }),
                });
                
                if (response.ok) {
                    const data = await response.json();
                    userId = data._id; //get the id of the user
                    localStorage.setItem("userId", userId);
                    console.log(data);
                } else {
                    console.error('Error fetching data');
                }
            

           
        }
    } catch (error) {
        console.error('Error!');
    }
        emailSection.style.display = "none";
        moveOn_btn.style.display = "none";
        start_btn.style.display = "block";
        intro.style.display = "block";
        quotesContainer.style.display = "block";
        reviewRules.style.display = "block";
        vision.style.display = "block";
        vision_btn.style.display = "block";
        });
    }
    const quotes = [
        "Hard work beats talent when talent doesn’t work hard.",
        "Obsession is just a word the lazy use to describe the dedicated.",
        "Fall seven times, stand up eight.",
        "Discipline is doing what you hate to do, but doing it like you love it.",
        "Success is the sum of small efforts, repeated day in and day out.",
        "What you do every day matters more than what you do once in a while.",
        "Suffer now and live the rest of your life as a champion.",
        "Self-control is strength. Right thought is mastery. Calmness is power.",
        "Don’t stop when you’re tired. Stop when you’re done.",
        "Grit is passion and perseverance for very long-term goals.",
        "You will never always be motivated. You must learn to be disciplined.",
        "It’s not about being the best. It’s about being better than you were yesterday.",
        "The only limit to your impact is your imagination and commitment.",
        "Obsessed is a word used by the weak to describe the dedicated.",
        "A river cuts through rock, not because of its power, but because of its persistence.",
        "Discipline is choosing between what you want now and what you want most.",
        "Dreams don’t work unless you do.",
        "The road to success is dotted with many tempting parking spaces.",
        "The pain of discipline is less than the pain of regret.",
        "Push yourself, because no one else is going to do it for you.",
        "Work until your idols become your rivals.",
        "If you want something you’ve never had, you must be willing to do something you’ve never done.",
        "The grind may go unnoticed, but the results won’t.",
        "Train like you’re the worst, perform like you’re the best.",
        "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
        "Excuses are the nails used to build a house of failure.",
        "Without self-discipline, success is impossible, period.",
        "Champions are made when no one is watching.",
        "Hard work compounds like interest. The earlier you do it, the more time you have for the benefits to pay off.",
        "The difference between ordinary and extraordinary is that little extra.",
        "You don't have to be extreme, just consistent.",
        "Focus on the process, not the outcome.",
        "The man who moves a mountain begins by carrying away small stones.",
        "One day or day one. You decide.",
        "Keep showing up. That’s the secret.",
        "If you quit once, it becomes a habit. Don’t quit.",
        "Obsessive effort is the fuel of mastery.",
        "Success isn’t always about greatness. It’s about consistency.",
        "Motivation gets you going, but discipline keeps you growing.",
        "You don’t rise to the level of your goals. You fall to the level of your systems.",
        "Consistency is harder when no one is clapping for you.",
        "You either suffer the pain of discipline or the pain of regret.",
        "The price of excellence is discipline.",
        "Get addicted to bettering yourself.",
        "If you can't stop thinking about it, don't stop working for it.",
        "Discipline is the bridge between goals and accomplishment.",
        "What you do in the dark will shine in the light.",
        "Greatness is forged in the furnace of discipline.",
        "Let your grind be louder than your excuses.",
        "Effort doesn’t guarantee success, but no effort guarantees failure.",
        "Every next level of your life will demand a different you.",
        "Do something today that your future self will thank you for.",
        "You’ll never always feel like it. Do it anyway.",
        "When you feel like quitting, think about why you started.",
        "Your habits shape your destiny.",
        "The only thing standing between you and your goal is the story you keep telling yourself.",
        "There’s no traffic on the extra mile.",
        "Obsessed people make it happen.",
        "The gap between dreams and reality is discipline.",
        "Never let your feelings dictate your focus.",
        "You are what you repeatedly do. Excellence, then, is not an act, but a habit.",
        "Success is not owned. It’s leased. And rent is due every day.",
        "Do it tired. Do it sore. Do it anyway.",
        "Don’t wish it were easier, wish you were better.",
        "Discipline is remembering what you want.",
        "If you want to be unstoppable, you must be unbreakable.",
        "Show up. Even when you don't feel like it.",
        "You don’t get what you want. You get what you work for.",
        "Champions keep going when they have nothing left.",
        "The strongest people aren’t always the ones who win, but the ones who don’t give up when they lose.",
        "Make your obsession your profession.",
        "You can’t cheat the grind. It knows how much you’ve invested.",
        "Your future is created by what you do today, not tomorrow.",
        "Talent may get you in the door, but character and grit keep you in the room.",
        "One more rep. One more page. One more mile.",
        "Be stronger than your excuses.",
        "The only bad workout is the one you didn’t do.",
        "Hard work is the foundation of all achievement.",
        "Outwork your competition, and outlast your obstacles.",
        "You can have results or excuses. Not both.",
        "Grind in silence. Let success make the noise.",
        "There is no shortcut. It takes time to build a better, stronger version of yourself.",
        "If you want to go fast, go alone. If you want to go far, go together. But either way, start walking.",
        "You didn’t come this far just to come this far.",
        "Be obsessed or be average.",
        "The best view comes after the hardest climb.",
        "Even when you don’t see results, keep going.",
        "The moment you want to quit is the moment you need to keep pushing.",
        "Self-control is a muscle—the more you use it, the stronger it gets.",
        "Do the hard things, especially when you don’t feel like it.",
        "The grind never lies.",
        "Make discipline your superpower.",
        "There’s no glory without sacrifice.",
        "Master yourself, and you master your life.",
        "Don’t expect people to understand your grind when God didn’t give them your vision.",
        "Nobody cares. Work harder.",
        "You are in control of how hard you work.",
        "The greatest investment you’ll ever make is in your own discipline.",
        "Every champion was once a contender who refused to give up.",
        "You won’t always be the most talented, but you can always be the most relentless.",
        "Out-discipline your doubts.",
        "When effort becomes habit, success becomes inevitable.",
    ];
   
    
    // Displaying a quote from array
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const currentDate = moment().utcOffset('+0900').format('YYYY-MM-DD HH:mm');

    if (start_btn){
        start_btn.addEventListener( "click", async () => {
            const quoteElement = document.querySelector(".quotes");  //chooses the class "quotes" in the HTML

            //CSS elements for this particular element that has been set by random selector of quotes
            quoteElement.textContent = randomQuote;
            quoteElement.style.fontSize = "20px";
            quoteElement.style.color = "#333";
            quoteElement.style.textAlign = "center";
            quoteElement.style.margin = "20px";
            quoteElement.style.fontFamily = "Arial, sans-serif";
            quoteElement.style.fontWeight = "bold";
            quoteElement.style.lineHeight = "1.5";
            quoteElement.style.backgroundColor = "#f9f9f9";
            quoteElement.style.padding = "20px";
            quoteElement.style.borderRadius = "10px";
            quoteElement.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

            
            emailValue = emailVal.value;
            localStorage.setItem("email", emailValue); //saves the email to local storage
            console.log(emailValue);

            try{
               
                const dayExist = await fetch("http://localhost:3200/days", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailValue, //submitting this to the server, seeing if there are any matching emails
                        day: currentDate, //submitting this to the server, seeing if there are any matching days
                        quote: randomQuote, //submitting this to the server, seeing if there are any matching quotes
                    }),
                });

                const checkData = await dayExist.json();
                console.log(checkData);
   

            } catch (error) {
                console.error('Error!', error);
            }



            
        

        });
    }

    if(vision_btn){
        vision_btn.addEventListener("click", () =>{
            window.location.href = "/vision.html"; //switches to seperate window
                   
        })
    }

});

