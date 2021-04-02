let exerciseListDiv = document.querySelector("div#card-list")
let newExerciseDiv = document.querySelector("div#add-exercise")
let newExerciseBtn = document.querySelector("#show-form")
let myWorkoutDiv = document.querySelector("div#user-list")

function pageSetup(){
    fetch("http://localhost:3000/exercises")
    .then(res => res.json())
    .then(function(exerciseArr){
        let workoutArr = exerciseArr.filter(exercise => exercise.isMyWorkout == true)
        exerciseArr.forEach(function(exercise){
            createExercise(exercise)
        })
        workoutArr.forEach(function(workout){
            createWorkout(workout)
        })
    })
}

pageSetup()

function createExercise(exercise){

    let exerciseCardDiv = document.createElement("div")
    exerciseCardDiv.className = "card"

    let exerciseNameH4 = document.createElement("h4")
        exerciseNameH4.innerText = exercise.name 

    let exerciseZone = document.createElement("p")
        exerciseZone.innerText = exercise.zone

    let exerciseImage = document.createElement("img")
        exerciseImage.className = "exercise-img"
        exerciseImage.src = exercise.image 
        exerciseImage.alt = exercise.name

    let exerciseForm = document.createElement("form")
        let setsLabel = document.createElement("label")
            setsLabel.innerText = `Sets: `
        let setsInput = document.createElement("input")
            setsInput.required = true
            setsInput.type = "text"
            setsInput.name = "set-field"
            setsInput.placeholder = `# of sets`
        let repsLabel = document.createElement("label")
            repsLabel.innerText = `Reps: `
        let repsInput = document.createElement("input")
            repsInput.required = true
            repsInput.type = "text"
            setsInput.name = "set-field"
            repsInput.placeholder = `# of reps`

        exerciseForm.append(setsLabel, setsInput, repsLabel, repsInput)

    let addExerciseBtn = document.createElement("button")
        addExerciseBtn.type = "submit"
        addExerciseBtn.innerText = `Add Exercise`

    exerciseCardDiv.append(exerciseImage, exerciseNameH4, exerciseZone, exerciseForm, addExerciseBtn)
    exerciseListDiv.append(exerciseCardDiv)

    addExerciseBtn.addEventListener("click", function(evt){
        // evt.preventDefault()

        let newSetsInput = setsInput.value
        let newRepsInput = repsInput.value

        fetch(`http://localhost:3000/exercises/${exercise.id}`,{
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                sets: newSetsInput,
                reps: newRepsInput,
                isMyWorkout: true
            })
        })
        .then(res => res.json())
        .then(function(updatedExercise){
            exercise.sets = updatedExercise.sets
            exercise.reps = updatedExercise.reps
            exercise.isMyWorkout = updatedExercise.isMyWorkout

            createWorkout(updatedExercise)
        })

    })

}

function createWorkout(exercise){

    let workoutCardDiv = document.createElement("div")
    workoutCardDiv.className = "workout-card"
    
    let exerciseImage = document.createElement("img")
        exerciseImage.className = "exercise-img"
        exerciseImage.src = exercise.image 
        exerciseImage.alt = exercise.name

    let exerciseNameH4 = document.createElement("h4")
        exerciseNameH4.innerText = exercise.name 

    let exerciseZone = document.createElement("p")
        exerciseZone.innerText = exercise.zone

    let reqEquip = document.createElement("p")
        if(exercise.requiresEquip){reqEquip.innerText = `Does require equipment`}
        else {reqEquip.innerText = `Does not require equipment`}

    let setsP = document.createElement("p")
        setsP.innerText = `Sets: ${exercise.sets}`

    let repsP = document.createElement("p")
        repsP.innerText = `Reps: ${exercise.reps}`

    let isDoneBoxLabel = document.createElement("label")
        isDoneBoxLabel.innerText = "Done: "
    let isDoneBoxInput = document.createElement("input")
        isDoneBoxInput.type = "checkbox"

    let brkpt = document.createElement("br")

    let removeBtn = document.createElement("button")
        removeBtn.innerText = "Remove"

    workoutCardDiv.append(exerciseImage, exerciseNameH4, exerciseZone, reqEquip, setsP, repsP, isDoneBoxLabel, isDoneBoxInput, brkpt, removeBtn)
    myWorkoutDiv.append(workoutCardDiv)

    removeBtn.addEventListener("click", function(evt){
        // evt.preventDefault()

        fetch(`http://localhost:3000/exercises/${exercise.id}`, {
            method: "PATCH",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                isMyWorkout: false
            })
        })
        .then(res => res.json())
        .then(function(updatedExercise){
            // exercise.isMyWorkout = updatedExercise.isMyWorkout
            // pageSetup()
            workoutCardDiv.remove()
        })

    })

    // addExerciseBtn.addEventListener("click", function(evt){
    //     // evt.preventDefault()

    //     let newSetsInput = setsInput.value
    //     let newRepsInput = repsInput.value

    //     fetch(`http://localhost:3000/exercises/${exercise.id}`,{
    //         method: "PATCH",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             sets: newSetsInput,
    //             reps: newRepsInput,
    //             isMyWorkout: true
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(function(updatedExercise){
    //         exercise.sets = updatedExercise.sets
    //         exercise.reps = updatedExercise.reps
    //         exercise.isMyWorkout = updatedExercise.isMyWorkout

            
    //     })

    // })

}



// function createRoutine(){
//     let newExercise = document.createElement("li")
    
// }


/* display the pictures of the exercise -> has add button, sets and reps 
when add button clicked, adds to list on side of screen
on list, can delete using delete button; can check off as done each exercise
// allow users to add their own exercises
*/
// This will allow users to create a workout to-do list.

// User Stories (remember about CRUD):

// MVP:
// User will be able to:
// User will be able to add exercises to their blank list
// Update the number reps and sets
// Update their checklist with what they’ve done
// Delete exercises

// Stretch goals:
// Login and create user profile
// Add a timer function 
// Link up to the outside API to seed our database

// Timeline:

// Monday: make exercise API, first fetch request, create a blank list


// Tuesday: update and delete requests


// Wednesday: work on stretch goals, try finding outside API

// Thursday: finish goals, CSS


// fetch()
