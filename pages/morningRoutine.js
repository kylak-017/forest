import moment from 'moment';
import { sub } from 'three/tsl';

document.addEventListener('DOMContentLoaded', function() {
    const moveToRoutine = document.getElementById("now-start-button");
    const timelineLine = document.querySelector('#timeline-line');
    const addTask = document.getElementById("task");
    const emailValue = localStorage.getItem('email');

    const firstTask = document.getElementById("first");
    const secondTask = document.getElementById("second");
    const thirdTask = document.getElementById("third");
    const fourthTask = document.getElementById("fourth");

    const firstTime = document.getElementById("time-1");
    const secondTime = document.getElementById("time-2");
    const thirdTime = document.getElementById("time-3");
    const fourthTime = document.getElementById("time-4");

    const priorityOfTask = document.getElementById("priority");
    const timeofTask = document.getElementById("time");
    const addSubTaskFor = document.getElementById("task-num");
    const subTask = document.getElementById("subtask");
    const subTaskConfirm = document.getElementById("add-sub-btn");
    const taskConfirm = document.getElementById("add-task-btn");

    const taskName1 = document.getElementById("p1");
    const taskName2 = document.getElementById("p2");
    const taskName3 = document.getElementById("p3");
    const taskName4 = document.getElementById("p4");
    const taskName5 = document.getElementById("p5");
    const taskName6 = document.getElementById("p6");
    const showSubTask1 = document.getElementById("st-1");
    const showSubTask2 = document.getElementById("st-2");
    const showSubTask3 = document.getElementById("st-3");
    const showSubTask4 = document.getElementById("st-4");
    const showSubTask5 = document.getElementById("st-5");
    const showSubTask6 = document.getElementById("st-6");
    const showSubTask7 = document.getElementById("st-7");
    const showSubTask8 = document.getElementById("st-8");
    const showSubTask9 = document.getElementById("st-9");
    const showSubTask10 = document.getElementById("st-10");
    
    // Task 2
    const showSubTask2_1 = document.getElementById("two-st-1");
    const showSubTask2_2 = document.getElementById("two-st-2");
    const showSubTask2_3 = document.getElementById("two-st-3");
    const showSubTask2_4 = document.getElementById("two-st-4");
    const showSubTask2_5 = document.getElementById("two-st-5");
    const showSubTask2_6 = document.getElementById("two-st-6");
    const showSubTask2_7 = document.getElementById("two-st-7");
    const showSubTask2_8 = document.getElementById("two-st-8");
    const showSubTask2_9 = document.getElementById("two-st-9");
    const showSubTask2_10 = document.getElementById("two-st-10");
    
    // Task 3
    const showSubTask3_1 = document.getElementById("three-st-1");
    const showSubTask3_2 = document.getElementById("three-st-2");
    const showSubTask3_3 = document.getElementById("three-st-3");
    const showSubTask3_4 = document.getElementById("three-st-4");
    const showSubTask3_5 = document.getElementById("three-st-5");
    const showSubTask3_6 = document.getElementById("three-st-6");
    const showSubTask3_7 = document.getElementById("three-st-7");
    const showSubTask3_8 = document.getElementById("three-st-8");
    const showSubTask3_9 = document.getElementById("three-st-9");
    const showSubTask3_10 = document.getElementById("three-st-10");
    
    // Task 4
    const showSubTask4_1 = document.getElementById("four-st-1");
    const showSubTask4_2 = document.getElementById("four-st-2");
    const showSubTask4_3 = document.getElementById("four-st-3");
    const showSubTask4_4 = document.getElementById("four-st-4");
    const showSubTask4_5 = document.getElementById("four-st-5");
    const showSubTask4_6 = document.getElementById("four-st-6");
    const showSubTask4_7 = document.getElementById("four-st-7");
    const showSubTask4_8 = document.getElementById("four-st-8");
    const showSubTask4_9 = document.getElementById("four-st-9");
    const showSubTask4_10 = document.getElementById("four-st-10");
    
    // Task 5
    const showSubTask5_1 = document.getElementById("five-st-1");
    const showSubTask5_2 = document.getElementById("five-st-2");
    const showSubTask5_3 = document.getElementById("five-st-3");
    const showSubTask5_4 = document.getElementById("five-st-4");
    const showSubTask5_5 = document.getElementById("five-st-5");
    const showSubTask5_6 = document.getElementById("five-st-6");
    const showSubTask5_7 = document.getElementById("five-st-7");
    const showSubTask5_8 = document.getElementById("five-st-8");
    const showSubTask5_9 = document.getElementById("five-st-9");
    const showSubTask5_10 = document.getElementById("five-st-10");
    
    // Task 6
    const showSubTask6_1 = document.getElementById("six-st-1");
    const showSubTask6_2 = document.getElementById("six-st-2");
    const showSubTask6_3 = document.getElementById("six-st-3");
    const showSubTask6_4 = document.getElementById("six-st-4");
    const showSubTask6_5 = document.getElementById("six-st-5");
    const showSubTask6_6 = document.getElementById("six-st-6");
    const showSubTask6_7 = document.getElementById("six-st-7");
    const showSubTask6_8 = document.getElementById("six-st-8");
    const showSubTask6_9 = document.getElementById("six-st-9");
    const showSubTask6_10 = document.getElementById("six-st-10");

    //Grid
    const grid  = document.getElementById("grid");
    const modal = document.getElementById("modal");
    const totalTrees = 7 * 4; //total month

    const stopBurnTree = document.getElementById("burn-tree-btn");


    //Timer IN-APP
    let totalTime = 0;
    const startTime = Date.now();
    console.log(startTime);


    function calculateTime(nowTime) {
        const inSeconds = Math.floor((nowTime- startTime) / 1000);

        return inSeconds;

    };

    const nowTime = Date.now();

    console.log(calculateTime(nowTime));

    function getDurationInSeconds(timeRange) {
        const [start, end] = timeRange.split(" - ");
        
        const starth = Number(start.split(":")[0]) * 3600;
        const startm = Number(start.split(":")[1]) * 60;
        
        const endh = Number(end.split(":")[0]) * 3600;
        const endm = Number(end.split(":")[1]) * 60;
    
        return {
            start: starth + startm,
            end: endh + endm,
            duration: (endh + endm) - (starth + startm)
        };
    }
    
    const arr_1 = firstTime.textContent;   // "4:00 - 4:06"
    const arr_2 = secondTime.textContent;  // "4:06 - 4:12"
    const arr_3 = thirdTime.textContent;   // "4:12 - 4:18"
    const arr_4 = fourthTime.textContent;  // "4:18 - 4:24"
    
    const block_1 = getDurationInSeconds(arr_1);
    const block_2 = getDurationInSeconds(arr_2);
    const block_3 = getDurationInSeconds(arr_3);
    const block_4 = getDurationInSeconds(arr_4);
    
    console.log("Block 1:", block_1);
    console.log("Block 2:", block_2);
    console.log("Block 3:", block_3);
    console.log("Block 4:", block_4);
    



    


   if (subTaskConfirm) {

    subTaskConfirm.addEventListener("click", async (event) => {
        console.log(emailValue, addSubTaskFor.value);
        event.preventDefault();
        const thatTaskId = await fetch ('http://localhost:3200/get-task-by-priority', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                priority: addSubTaskFor.value,
                date: moment().startOf('day').toISOString()

            })
        });

        const thatTaskIdIs = await thatTaskId.json();
        console.log(emailValue, addSubTaskFor.value);
        console.log("Array:", thatTaskIdIs);

        const thatTaskIdIsThis = thatTaskIdIs.taskId;
        console.log("Task Id:", thatTaskIdIsThis);

        console.log("Id:" , thatTaskIdIsThis);

        console.log(subTask.value.trim());

     

        const nowAddSubTask = await fetch (`http://localhost:3200/tasks/${thatTaskIdIsThis}/add-subtask`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                subtask: subTask.value.trim(),
            })
        });

        const nowAddSubTaskIs = await nowAddSubTask.json();
        if (nowAddSubTaskIs.ok){
            console.log("added subtask successfully");
        }
        console.log("added subtask successfully");
        console.log(subTask.value);

        const subtasksare = await fetch ('http://localhost:3200/subtask-array', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                taskId: thatTaskIdIsThis
            })
        });
        const subTaskArray = await subtasksare.json();

       
        const subTaskArrayIs = subTaskArray.subtaskArray;
        const subTaskArrayP = subTaskArray.priority;
        const subTaskArrayTask = subTaskArray.task;

        console.log(subTaskArrayIs);

        console.log("Trying to show:", subTaskArrayIs, subTaskArrayP, subTaskArrayTask);
        console.log("Subtask Title:", subTaskArrayIs[0]?.title);

        if (subTaskArrayP == "p1") {
            calculateTime();
            console.log(calculateTime());

            console.log(subTaskArray);

            taskName1.textContent = subTaskArrayTask;

            if (subTaskArrayIs[0]) {
                showSubTask1.style.display = "block";
                showSubTask1.textContent = "1. " + subTaskArrayIs[0].title;
            }
            if (subTaskArrayIs[1]) {
                showSubTask2.style.display = "block";
                showSubTask2.textContent = "2. " + subTaskArrayIs[1].title;
            }
            if (subTaskArrayIs[2]) {
                showSubTask3.style.display = "block";
                showSubTask3.textContent = "3. " + subTaskArrayIs[2].title;
            }
            if (subTaskArrayIs[3]) {
                showSubTask4.style.display = "block";
                showSubTask4.textContent = "4. " + subTaskArrayIs[3].title;
            }
            if (subTaskArrayIs[4]) {
                showSubTask5.style.display = "block";
                showSubTask5.textContent = "5. " + subTaskArrayIs[4].title;
            }
            if (subTaskArrayIs[5]) {
                showSubTask6.style.display = "block";
                showSubTask6.textContent = "6. " + subTaskArrayIs[5].title;
            }
            if (subTaskArrayIs[6]) {
                showSubTask7.style.display = "block";
                showSubTask7.textContent = "7. " + subTaskArrayIs[6].title;
            }
            if (subTaskArrayIs[7]) {
                showSubTask8.style.display = "block";
                showSubTask8.textContent = "8. " + subTaskArrayIs[7].title;
            }
            if (subTaskArrayIs[8]) {
                showSubTask9.style.display = "block";
                showSubTask9.textContent = "9. " + subTaskArrayIs[8].title;
            }
            if (subTaskArrayIs[9]) {
                showSubTask10.style.display = "block";
                showSubTask10.textContent = "10. " + subTaskArrayIs[9].title;
            }
        }
        
        if (subTaskArrayP == "p2") {


            taskName2.textContent = subTaskArrayTask;

            if (subTaskArrayIs[0]) {
                showSubTask2_1.style.display = "block";
                showSubTask2_1.textContent = "1. " + subTaskArrayIs[0].title;
            }
            if (subTaskArrayIs[1]) {
                showSubTask2_2.style.display = "block";
                showSubTask2_2.textContent = "2. " + subTaskArrayIs[1].title;
            }
            if (subTaskArrayIs[2]) {
                showSubTask2_3.style.display = "block";
                showSubTask2_3.textContent = "3. " + subTaskArrayIs[2].title;
            }
            if (subTaskArrayIs[3]) {
                showSubTask2_4.style.display = "block";
                showSubTask2_4.textContent = "4. " + subTaskArrayIs[3].title;
            }
            if (subTaskArrayIs[4]) {
                showSubTask2_5.style.display = "block";
                showSubTask2_5.textContent = "5. " + subTaskArrayIs[4].title;
            }
            if (subTaskArrayIs[5]) {
                showSubTask2_6.style.display = "block";
                showSubTask2_6.textContent = "6. " + subTaskArrayIs[5].title;
            }
            if (subTaskArrayIs[6]) {
                showSubTask2_7.style.display = "block";
                showSubTask2_7.textContent = "7. " + subTaskArrayIs[6].title;
            }
            if (subTaskArrayIs[7]) {
                showSubTask2_8.style.display = "block";
                showSubTask2_8.textContent = "8. " + subTaskArrayIs[7].title;
            }
            if (subTaskArrayIs[8]) {
                showSubTask2_9.style.display = "block";
                showSubTask2_9.textContent = "9. " + subTaskArrayIs[8].title;
            }
            if (subTaskArrayIs[9]) {
                showSubTask2_10.style.display = "block";
                showSubTask2_10.textContent = "10. " + subTaskArrayIs[9].title;
            }
        }
        
        if (subTaskArrayP == "p3") {

            taskName3.textContent = subTaskArrayTask;

            if (subTaskArrayIs[0]) {
                showSubTask3_1.style.display = "block";
                showSubTask3_1.textContent = "1. " + subTaskArrayIs[0].title;
            }
            if (subTaskArrayIs[1]) {
                showSubTask3_2.style.display = "block";
                showSubTask3_2.textContent = "2. " + subTaskArrayIs[1].title;
            }
            if (subTaskArrayIs[2]) {
                showSubTask3_3.style.display = "block";
                showSubTask3_3.textContent = "3. " + subTaskArrayIs[2].title;
            }
            if (subTaskArrayIs[3]) {
                showSubTask3_4.style.display = "block";
                showSubTask3_4.textContent = "4. " + subTaskArrayIs[3].title;
            }
            if (subTaskArrayIs[4]) {
                showSubTask3_5.style.display = "block";
                showSubTask3_5.textContent = "5. " + subTaskArrayIs[4].title;
            }
            if (subTaskArrayIs[5]) {
                showSubTask3_6.style.display = "block";
                showSubTask3_6.textContent = "6. " + subTaskArrayIs[5].title;
            }
            if (subTaskArrayIs[6]) {
                showSubTask3_7.style.display = "block";
                showSubTask3_7.textContent = "7. " + subTaskArrayIs[6].title;
            }
            if (subTaskArrayIs[7]) {
                showSubTask3_8.style.display = "block";
                showSubTask3_8.textContent = "8. " + subTaskArrayIs[7].title;
            }
            if (subTaskArrayIs[8]) {
                showSubTask3_9.style.display = "block";
                showSubTask3_9.textContent = "9. " + subTaskArrayIs[8].title;
            }
            if (subTaskArrayIs[9]) {
                showSubTask3_10.style.display = "block";
                showSubTask3_10.textContent = "10. " + subTaskArrayIs[9].title;
            }
        }
        
        if (subTaskArrayP == "p4") {

            taskName4.textContent = subTaskArrayTask;

            if (subTaskArrayIs[0]) {
                showSubTask4_1.style.display = "block";
                showSubTask4_1.textContent = "1. " + subTaskArrayIs[0].title;
            }
            if (subTaskArrayIs[1]) {
                showSubTask4_2.style.display = "block";
                showSubTask4_2.textContent = "2. " + subTaskArrayIs[1].title;
            }
            if (subTaskArrayIs[2]) {
                showSubTask4_3.style.display = "block";
                showSubTask4_3.textContent = "3. " + subTaskArrayIs[2].title;
            }
            if (subTaskArrayIs[3]) {
                showSubTask4_4.style.display = "block";
                showSubTask4_4.textContent = "4. " + subTaskArrayIs[3].title;
            }
            if (subTaskArrayIs[4]) {
                showSubTask4_5.style.display = "block";
                showSubTask4_5.textContent = "5. " + subTaskArrayIs[4].title;
            }
            if (subTaskArrayIs[5]) {
                showSubTask4_6.style.display = "block";
                showSubTask4_6.textContent = "6. " + subTaskArrayIs[5].title;
            }
            if (subTaskArrayIs[6]) {
                showSubTask4_7.style.display = "block";
                showSubTask4_7.textContent = "7. " + subTaskArrayIs[6].title;
            }
            if (subTaskArrayIs[7]) {
                showSubTask4_8.style.display = "block";
                showSubTask4_8.textContent = "8. " + subTaskArrayIs[7].title;
            }
            if (subTaskArrayIs[8]) {
                showSubTask4_9.style.display = "block";
                showSubTask4_9.textContent = "9. " + subTaskArrayIs[8].title;
            }
            if (subTaskArrayIs[9]) {
                showSubTask4_10.style.display = "block";
                showSubTask4_10.textContent = "10. " + subTaskArrayIs[9].title;
            }
        }
        
        if (subTaskArrayP == "p5") {

            taskName5.textContent = subTaskArrayTask;


            if (subTaskArrayIs[0]) {
                showSubTask5_1.style.display = "block";
                showSubTask5_1.textContent = "1. " + subTaskArrayIs[0].title;
            }
            if (subTaskArrayIs[1]) {
                showSubTask5_2.style.display = "block";
                showSubTask5_2.textContent = "2. " + subTaskArrayIs[1].title;
            }
            if (subTaskArrayIs[2]) {
                showSubTask5_3.style.display = "block";
                showSubTask5_3.textContent = "3. " + subTaskArrayIs[2].title;
            }
            if (subTaskArrayIs[3]) {
                showSubTask5_4.style.display = "block";
                showSubTask5_4.textContent = "4. " + subTaskArrayIs[3].title;
            }
            if (subTaskArrayIs[4]) {
                showSubTask5_5.style.display = "block";
                showSubTask5_5.textContent = "5. " + subTaskArrayIs[4].title;
            }
            if (subTaskArrayIs[5]) {
                showSubTask5_6.style.display = "block";
                showSubTask5_6.textContent = "6. " + subTaskArrayIs[5].title;
            }
            if (subTaskArrayIs[6]) {
                showSubTask5_7.style.display = "block";
                showSubTask5_7.textContent = "7. " + subTaskArrayIs[6].title;
            }
            if (subTaskArrayIs[7]) {
                showSubTask5_8.style.display = "block";
                showSubTask5_8.textContent = "8. " + subTaskArrayIs[7].title;
            }
            if (subTaskArrayIs[8]) {
                showSubTask5_9.style.display = "block";
                showSubTask5_9.textContent = "9. " + subTaskArrayIs[8].title;
            }
            if (subTaskArrayIs[9]) {
                showSubTask5_10.style.display = "block";
                showSubTask5_10.textContent = "10. " + subTaskArrayIs[9].title;
            }
        }
        
        if (subTaskArrayP == "p6") {

            taskName6.textContent = subTaskArrayTask;


            if (subTaskArrayIs[0]) {
                showSubTask6_1.style.display = "block";
                showSubTask6_1.textContent = "1. " + subTaskArrayIs[0].title;
            }
            if (subTaskArrayIs[1]) {
                showSubTask6_2.style.display = "block";
                showSubTask6_2.textContent = "2. " + subTaskArrayIs[1].title;
            }
            if (subTaskArrayIs[2]) {
                showSubTask6_3.style.display = "block";
                showSubTask6_3.textContent = "3. " + subTaskArrayIs[2].title;
            }
            if (subTaskArrayIs[3]) {
                showSubTask6_4.style.display = "block";
                showSubTask6_4.textContent = "4. " + subTaskArrayIs[3].title;
            }
            if (subTaskArrayIs[4]) {
                showSubTask6_5.style.display = "block";
                showSubTask6_5.textContent = "5. " + subTaskArrayIs[4].title;
            }
            if (subTaskArrayIs[5]) {
                showSubTask6_6.style.display = "block";
                showSubTask6_6.textContent = "6. " + subTaskArrayIs[5].title;
            }
            if (subTaskArrayIs[6]) {
                showSubTask6_7.style.display = "block";
                showSubTask6_7.textContent = "7. " + subTaskArrayIs[6].title;
            }
            if (subTaskArrayIs[7]) {
                showSubTask6_8.style.display = "block";
                showSubTask6_8.textContent = "8. " + subTaskArrayIs[7].title;
            }
            if (subTaskArrayIs[8]) {
                showSubTask6_9.style.display = "block";
                showSubTask6_9.textContent = "9. " + subTaskArrayIs[8].title;
            }
            if (subTaskArrayIs[9]) {
                showSubTask6_10.style.display = "block";
                showSubTask6_10.textContent = "10. " + subTaskArrayIs[9].title;
            }
        }
        

     

    });
   }

    
    if (taskConfirm) {
        taskConfirm.addEventListener("click", async (event) => {
            event.preventDefault();
            const taskValue = addTask.value;
            const priorityValue = priorityOfTask.value;
            const dateValue = moment().startOf('day').toISOString()



            console.log(taskValue, priorityValue, dateValue, timeofTask.value);
            console.log(Number(timeofTask.value) * 3600)
            try {
                const response = await fetch('http://localhost:3200/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: emailValue,
                        task: taskValue,
                        date: dateValue,
                        time: Number(timeofTask.value) * 3600,
                        priority: priorityValue,
                        completed: false
                    })
                });

                if (response.ok) {
                    console.log("Task added successfully");
                } else {
                    console.log("Error adding task", error);
                }
            } catch (error) {
                console.error('Error adding task:', error);
            }
        });
    }

    if (moveToRoutine) {
        moveToRoutine.addEventListener("click", () => {
            window.location.href = "/routines.html"; // Redirect to morningRoutine.html
                  
    });
    }


    timelineLine.style.animation = 'growTimeline 30s forwards ease-in-out';

    try{
        const addHabit = fetch('http://localhost:3200/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                habit: "Rise and Shine",
                order: 1,
                streak: 0,
                repeat: true,
                time: 5 * 60, //5 minutes,
                completed: false,


            })
        })
    } catch (error) {
        console.error('Error adding habit:', error);
    }

    try{
        const addHabit2 = fetch('http://localhost:3200/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                habit: "Wash Face + Lotion + Water",
                repeat: true,
                order: 2,
                streak: 0,
                time: 5 * 60, //5 minutes,
                completed: false,


            })
        })
    } catch (error) {
        console.error('Error adding habit:', error);
    }

    try{
        const addHabit3 = fetch('http://localhost:3200/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                habit: "Brainstorm Tasks/ Get It Ready",
                repeat: true,
                order: 3,
                streak: 0,
                time: 5 * 60, //5 minutes,
                completed: false,


            })
        })
    } catch (error) {
        console.error('Error adding habit:', error);
    }

    try{
        const addHabit4 = fetch('http://localhost:3200/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                habit: "20 Push Ups + 10 Bicep Curls (ES) + 10 Lateral Raises (ES)",
                repeat: true,
                streak: 0,
                order: 4,
                time: 5 * 60, //5 minutes,
                completed: false,


            })
        })
    } catch (error) {
        console.error('Error adding habit:', error);
    }




  


    if (firstTask) {
        firstTask.addEventListener("click" , async () => {

            try{

            const habitIdFind = await fetch ('http://localhost:3200/user-id-tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    order: 1,
                })
            });

            const response = await habitIdFind.json();
            const habitId = response.habitId;
            console.log(habitId);

            const changeHabit1 = await fetch(`http://localhost:3200/habits/${habitId}/complete`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    completed: true,
                })

            })

            firstTask.checked = true;
            firstTask.style.backgroundColor = "green";

            

            const responseOk = await changeHabit1.json();
            if (responseOk.ok){
            console.log("changed succesffully");

            const find_user = await fetch ('http://localhost:3200/user-id', { //getting the user document to change forest status
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                })
            });

            const responseUser = await find_user.json();
            const userId = responseUser.userId;

            const nowTime = Date.now();
            console.log(calculateTime(nowTime));
            totalTime = totalTime + block_1;
            

            if (totalTime < calculateTime(nowTime)) {  //if the elapsed time is greater than the time that you should be taking to finish the routine at that particular check point
                console.log("You have not completed the task in time");

                const burn_tree = await fetch (`http://localhost:3200/users/${userId}/burn-tree`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: emailValue,
                    })
                });

                console.log("tree is burning!")

                modal.classList.add("open");
                
                stopBurnTree.addEventListener("click", () => {
                    modal.classList.remove("open");
                })
                 
            }
        }

        } catch (error) {
            console.error('Error adding habit:', error);
            }
        })
    

    }


    if (secondTask) {
        secondTask.addEventListener("click" , async () => {

            try{

            const habitIdFind = await fetch ('http://localhost:3200/user-id-tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    order: 2,
                })
            });

            const response = await habitIdFind.json();
            const habitId = response.habitId;
            console.log(habitId);
            
            const changeHabit2 = await fetch(`http://localhost:3200/habits/${habitId}/complete`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    completed: true,
                })

            })

            secondTask.checked = true;
            secondTask.style.backgroundColor = "green";

            const responseOk = await changeHabit2.json();
            if (responseOk.ok){
            console.log("changed succesffully");
            const find_user = await fetch ('http://localhost:3200/user-id', { //getting the user document to change forest status
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                })
            });

            const responseUser = await find_user.json();
            const userId = responseUser.userId;

            const nowTime = Date.now();
            console.log(calculateTime(nowTime));
            totalTime = totalTime + block_2;
            

            if (totalTime < calculateTime(nowTime)) {  //if the elapsed time is greater than the time that you should be taking to finish the routine at that particular check point
                console.log("You have not completed the task in time");

                const burn_tree = await fetch (`http://localhost:3200/users/${userId}/burn-tree`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: emailValue,
                    })
                });

                console.log("tree is burning!")

                modal.classList.add("open");
                
                stopBurnTree.addEventListener("click", () => {
                    modal.classList.remove("open");
                })
                 
            }
        }

        } catch (error) {
            console.error('Error adding habit:', error);
            }
        })
    

    }


    if (thirdTask) {
        thirdTask.addEventListener("click" , async () => {

            try{

            const habitIdFind = await fetch ('http://localhost:3200/user-id-tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    order: 3,
                })
            });

            const response = await habitIdFind.json();
            const habitId = response.habitId;
            console.log(habitId);

            const changeHabit3 = await fetch(`http://localhost:3200/habits/${habitId}/complete`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    completed: true,
                    
                })

            })
            thirdTask.checked = true;
            thirdTask.style.backgroundColor = "green";

            const responseOk = await changeHabit3.json();
            if (responseOk.ok){
            console.log("changed succesffully");

            const find_user = await fetch ('http://localhost:3200/user-id', { //getting the user document to change forest status
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                })
            });

            const responseUser = await find_user.json();
            const userId = responseUser.userId;

            const nowTime = Date.now();
            console.log(calculateTime(nowTime));
            totalTime = totalTime + block_3;
            

            if (totalTime < calculateTime(nowTime)) {  //if the elapsed time is greater than the time that you should be taking to finish the routine at that particular check point
                console.log("You have not completed the task in time");

                const burn_tree = await fetch (`http://localhost:3200/users/${userId}/burn-tree`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: emailValue,
                    })
                });

                console.log("tree is burning!")

                modal.classList.add("open");
                
                stopBurnTree.addEventListener("click", () => {
                    modal.classList.remove("open");
                })
                 
            }
        }

        } catch (error) {
            console.error('Error adding habit:', error);
            }
        })
    

    }


    if (fourthTask) {
        fourthTask.addEventListener("click" , async () => {

            try{
            const habitIdFind = await fetch ('http://localhost:3200/user-id-tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    order: 4,
                })
            });

            const response = await habitIdFind.json();
            const habitId = response.habitId;
            console.log(habitId);

            const changeHabit4 = await fetch(`http://localhost:3200/habits/${habitId}/complete`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    completed: true,
                })

            })
            fourthTask.checked = true;
            fourthTask.style.backgroundColor = "green";
            console.log("checked");

            const responseOk = await changeHabit4.json();
            if (responseOk.ok){
            console.log("changed succesffully");

            const find_user = await fetch ('http://localhost:3200/user-id', { //getting the user document to change forest status
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                })
            });

            const responseUser = await find_user.json();
            const userId = responseUser.userId;

            const nowTime = Date.now();
            console.log(calculateTime(nowTime));
            totalTime = totalTime + block_4;
            

            if (totalTime < calculateTime(nowTime)) {  //if the elapsed time is greater than the time that you should be taking to finish the routine at that particular check point
                console.log("You have not completed the task in time");

                const burn_tree = await fetch (`http://localhost:3200/users/${userId}/burn-tree`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: emailValue,
                    })
                });

                console.log("tree is burning!")

                modal.classList.add("open");
                
                stopBurnTree.addEventListener("click", () => {
                    modal.classList.remove("open");
                })
                 
            }
        }

        } catch (error) {
            console.error('Error adding habit:', error);
            }
        })
    

    }

  
});