//Testing file
//global variables: ======================================================================================================/
const userURL = "http://localhost:3000/users"
const exerciseURL = "http://localhost:3000/exercises"
const routineURL = "http://localhost:3000/routines"
let currentUser = null
let currentRoutine = []
let addToggle = false
//End golbal vars=========================================================================================================/


//static elements: =======================================================================================================/
//log-in elements
const showLogInButton = document.querySelector("button#li-button")
const logInForm = document.querySelector("form#log-in-form")

//Login elements
const logInConf = document.querySelector("p#login-conf")
//sign-in elements
const showSignUpButton = document.querySelector("button#su-button")
const signUpForm = document.querySelector("form#sign-up-form")

//add exercise elements
const toggleContainerButton = document.querySelector("button#show-form")
const addContainer = document.querySelector("div#add-container")
const addExerciseForm = document.querySelector("form#add-exercise-form")

//user's routine list
const routineContainer = document.querySelector("div#routine")
const routineTabs = document.querySelector("div#routine-tabs")
const buildButton = document.querySelector("button#build-button")
const saveButton = document.querySelector("button#save-button")
const routineList = document.querySelector("div#user-list")

//List of exercises to choose from(query from server)
const cardList = document.querySelector("div#card-list")
//END static elements=====================================================================================================/

//"Main": ================================================================================================================/
//get all exercises and put them as exercise cards
queryExercises()
//END "Main"==============================================================================================================/

//static eventListeners: =================================================================================================/
//log-in elements
showLogInButton.addEventListener("click", () => {
    logInForm.classList.add("show")
})

logInForm.addEventListener("submit", event => {
    event.preventDefault()
    //do stuff
    let username = event.target.username.value
    submitUser(username)
    
    // showUserRoutine()

    logInForm.classList.remove("show")
})

//sign-in elements
showSignUpButton.addEventListener("click", () => {

})

signUpForm.addEventListener("submit", event => {
    event.preventDefault()
    //do stuff
    let newUser = event.target.username.value

    addNewUser(newUser)

    signUpForm.classList.remove("show")
})

//add exercise elements
toggleContainerButton.addEventListener("click", () => {
    addToggle ? addContainer.classList.add("collapse") : addContainer.classList.remove("collapse")
    
    addToggle = !addToggle
})

addExerciseForm.addEventListener("submit", event => {
    event.preventDefault()
    //do stuff

    // console.log(event.target.name.value, event.target.zone.value, event.target.image.value, event.target.toggle.checked)
    addNewExercise(event.target.name.value, event.target.zone.value, event.target.image.value, event.target.toggle.checked)

    //clear fields
    event.target.name.value = ""
    event.target.zone.value = ""
    event.target.image.value = ""
    event.target.toggle.checked = false
})

//routine tabs
buildButton.addEventListener("click", () => {
    clearRoutine()

    // exercises.forEach(exercise => {
    //     addToRoutine(exercise)
    // })
})

//when clicked saves current routine as new favorite routine
saveButton.addEventListener("click", () => {
    if (!!currentUser) {
        fetch(routineURL, {
            method: "POST",
            headers: {
               "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: currentUser.id,
                exercises: currentRoutine
            })
        })
            .then(resp => resp.json())
            .then(addedRoutine => {
                currentUser.routines = [...currentUser.routines, addedRoutine]
                loadTabs()
            })  
    }

    
})
//END static events=======================================================================================================/

//Helper functions: ======================================================================================================/
function queryExercises() {
    fetch(exerciseURL)
    .then(resp => resp.json())
    .then(queriedList => {
        exercises = queriedList

        //clear cards
        cardList.innerHTML = ""

        //add item card for each exercise
        exercises.forEach(exercise => {
            //add card
            addCard(exercise)
        })
    })

}

function addNewUser(username) {
    fetch(userURL, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: username
        })
    })
        .then(resp => resp.json())
        .then(newUser => {
            newUser.routines = []
            currentUser = newUser
            clearTabs()
        })
}


// [ Example queried user
//     {
//       "id": 1,
//       "username": "Phil",
//       "routines": [
//         {
//           "id": 1,
//           "userId": 1,
//           "exercises": [
//             {
//               "id": 6,
//               "name": "Wipers",
//               "zone": "core",
//               "image": "https://evolve-gym.com/wp-content/uploads/2017/05/Windshield-Wiper-Abs-Floor-Exercise-300x200.jpeg",
//               "requiresEquip": false
//             },
//             {
//               "id": 7,
//               "name": "Planks",
//               "zone": "core",
//               "image": "https://www.silversneakers.com/wp-content/uploads/2019/08/SSBlog_PlankVariation_700x525.jpg",
//               "requiresEquip": false
//             },
//             {
//               "id": 8,
//               "name": "Pull-ups",
//               "zone": "upper-body",
//               "sets": 3,
//               "reps": 5,
//               "image": "https://i.ytimg.com/vi/HRV5YKKaeVw/maxresdefault.jpg",
//               "requiresEquip": false
//             }
//           ]
//         }
//       ]
//     }
//   ]
function submitUser(username) {
    fetch(`${userURL}?_embed=routines&username=${username}`)
        .then(resp => resp.json())
        .then(queriedUsers => {
            if (queriedUsers.length > 0) {
                currentUser = queriedUsers[0]
            clearTabs()
            loadTabs()
            }
            //Otherwise skip, login unsuccessful
        })
}

// function showUserRoutine() {
//     //checks if any user is logged in (don't proceed if not)
//     if (!!currentUser) {
//         //iterate throught all routines of current user & show routine as new button on tablist
//     }

    

//     //create event listener that displays currently selected tab as routine list
//     //(use same function that adds items to user list from exercise list)
// }

function addNewExercise(name, zone, image, equip) {
    fetch(exerciseURL, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            zone: zone,
            image: image,
            requiresEquip: equip
        })
    })
        .then(resp => resp.json())
        .then(addedExercise => {
            queryExercises()
        })
}

function addCard(exercise) {
    let card = document.createElement("div")
    card.classList.add("card")

    let image = document.createElement("img")
    image.setAttribute("src", exercise.image)
    image.setAttribute("alt", "exercise image")
    image.classList.add("exercise-img")

    let header = document.createElement("h4")
    header.innerText = exercise.name

    let zoneText = document.createElement("p")
    zoneText.innerText = exercise.zone

    let needsEquip = document.createElement("p")
    exercise.requiresEquip ? needsEquip.innerText = "Needs equipment" : needsEquip.innerText = "Does not need equipment"

    let inputForm = document.createElement("form")

    let setLabel = document.createElement("label")
    setLabel.setAttribute("for", "set-field")
    setLabel.innerText = "Sets:"

    let setField = document.createElement("input")
    setField.setAttribute("type", "text")
    setField.setAttribute("name", "set-field")
    setField.setAttribute("placeholder", "# of sets")

    let repLabel = document.createElement("label")
    repLabel.setAttribute("for", "set-field")
    repLabel.innerText = "Reps:"

    let repField = document.createElement("input")
    repField.setAttribute("type", "text")
    repField.setAttribute("name", "rep-field")
    repField.setAttribute("placeholder", "# of reps")

    let submit = document.createElement("input")
    submit.setAttribute("type", "submit")
    submit.setAttribute("value", "Add")

    inputForm.append(setLabel, setField, repLabel, repField, submit)
    card.append(image, header, zoneText, needsEquip, inputForm)

    cardList.append(card)


    //Add event listeners
    inputForm.addEventListener("submit", event => {
        event.preventDefault()

        let sets = event.target["set-field"].value === "" ? 3 : event.target["set-field"].value
        let reps = event.target["rep-field"].value === "" ? 5 : event.target["rep-field"].value

        let userExercise = Object.assign({}, exercise, {
            sets: sets,
            reps: reps
        })

        //hide card 
        card.classList.add("selected")

        //show on user routine
        addToRoutine(userExercise, card)
    })
}

function addToRoutine(exercise, card) {
    let routineCard = document.createElement("div")
    routineCard.classList.add("routine-card")

    let image = document.createElement("img")
    image.setAttribute("src", exercise.image)
    image.setAttribute("alt", "exercise image")
    image.classList.add("exercise-img")

    let header = document.createElement("h4")
    header.innerText = exercise.name

    let zoneText = document.createElement("p")
    zoneText.innerText = exercise.zone

    let requiresEquip = document.createElement("p")
    requiresEquip.innerText = `${exercise.requiresEquip ? "Does": "Does not"} require equipment`

    let setReps = document.createElement("p")
    setReps.innerText = `sets: ${exercise.sets} | reps: ${exercise.reps}`

    let doneLabel = document.createElement("label")
    doneLabel.setAttribute("for", "is-done")
    doneLabel.innerText = "Done?: "

    let doneCheck = document.createElement("input")
    doneCheck.setAttribute("type", "checkbox")
    doneCheck.setAttribute("name", "is-done")

    let lineBreak = document.createElement("br")

    let removeButton = document.createElement("button")
    removeButton.innerText = "remove"

    routineCard.append(image, header, zoneText, requiresEquip, setReps, doneLabel, doneCheck, lineBreak, removeButton)
    routineList.append(routineCard)

    routineContainer.classList.remove("empty")

    doneCheck.addEventListener("click", () => {
        doneCheck.checked ? routineCard.classList.add("done") : routineCard.classList.remove("done")
    })

    //For saved routines (if no card is passed)
    if (!!card) {
        //add exercise to current routine list
        currentRoutine = [...currentRoutine, exercise]

        removeButton.addEventListener("click", () => {
            card.classList.remove("selected")
            
            routineCard.remove()

            currentRoutine = currentRoutine.filter(exc => exc.id !== exercise.id)

            if (routineList.innerHTML === "") {
                routineContainer.classList.add("empty")
            }
        })
    } else {
        //replace with hiding
        removeButton.disabled = true
    }
}

function loadTabs() {
    //show routine container
    routineContainer.classList.remove("empty")
    

    //Iterate through currentUser's routines, make a tab for each
    currentUser.routines.forEach((routine, index) => {
        //create tab
        let tab = document.createElement("button")
        tab.innerText = `favorite #${index + 1}`
        tab.classList.add("favorite-tab")

        let deleteButton = document.createElement("button")
        deleteButton.innerText = "X"
        deleteButton.classList.add("tab-button")

        tab.append(deleteButton)
        routineTabs.append(tab)

        //shows routine on click
        tab.addEventListener("click", () => {
            let routine = currentUser.routines[index].exercises     //A routine is a list of exercises
            
            clearRoutine()
            //For each exercise, add a routine card
            routine.forEach(exercise => {
                addToRoutine(exercise)
            })
        })

        //deletes routine on click
        deleteButton.addEventListener("click", () => {
            fetch(`${routineURL}/${routine.id}`, {
                method: "DELETE"
            })
                .then(resp => resp.json())
                .then(emptyObj => {
                    //Remove on front-end
                    tab.remove()
                    
                    //still needs every routine at their element so to simulate dalete, change routine to empty string
                    currentUser.routines[index] = ""
                })
        })

    })
}

function clearTabs() {
    routineTabs.querySelectorAll("button.favorite-tab").forEach(tab => {
        tab.remove()
    })
}

function clearRoutine() {
    routineList.innerHTML = ""
}
//END Helper functions ====================================================================================================/