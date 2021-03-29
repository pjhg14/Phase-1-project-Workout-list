

fetch("http://localhost:3000/exercises")
    .then(res => res.json())
    .then(function(exerciseArr){
        exerciseArr.forEach(function(exercise){
            console.log(exercise)
        })
    })