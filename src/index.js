let exerciseListDiv = document.querySelector("div#exercise-cards")

fetch("http://localhost:3000/exercises")
    .then(res => res.json())
    .then(function(exerciseArr){
        exerciseArr.forEach(function(exerciseObj){
            createExercise(exerciseObj)
        })
    })

function createExercise(obj){

    let exerciseCardDiv = document.createElement("div")
    exerciseCardDiv.className = "card"

    let exerciseNameH2 = document.createElement("h2")
    exerciseNameH2.innertext = obj.name 

    let exerciseZone = document.createElement("h3")
    exerciseZone.innertext = obj.zone

    let exerciseImage = document.createElement("img")
    exerciseImage.src = obj.image 
    exerciseImage.alt = obj.name

    let exerciseSets = document.createElement("p")
    exerciseSets.innerText = `${obj.sets} sets`

    let exerciseReps = document.createElement("p")
    exerciseReps.innerText = `${obj.reps} reps`

    let addExerciseBtn = document.createElement("button")
    addExerciseBtn.innerText = `Add`

    exerciseCardDiv.append(exerciseNameH2, exerciseZone, exerciseImage, exerciseReps,exerciseSets, addExerciseBtn)
    exerciseListDiv.append(exerciseCardDiv)
}

// function createRoutine(){
//     let newExercise = document.createElement("li")
    
// }


/* display the pictures of the exercise -> has add button, sets and reps 
when add button clicked, adds to list on side of screen
on list, can delete using delete button; can check off as done each exercise
// allow users to add their own exercises
*/