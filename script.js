let query = document.querySelector('#query')
let resultContainer = document.querySelector('.search-results')

function search() {
    // delete previous search results
    resultContainer.innerHTML = ""
    
    let searchQuery = query.value
    query.value = ""
    if (searchQuery !== "") {
        fetch('https://api.postalpincode.in/pincode/' + searchQuery)
        .then(r => r.json())
        .then(d => {
            if (d[0].Status == "404") {
                let emptyMsg = document.createElement('span')
                emptyMsg.innerText = "Sorry, no matching results found."
                resultContainer.appendChild(emptyMsg)
            } else {
                for (let resultItem of d[0].PostOffice) {
                    let div = document.createElement('div')
                    div.classList.add('result-item')
    
                    let title = document.createElement('h3')
                    title.classList.add('title')
    
                    title.innerText = resultItem.Name
    
                    let location = document.createElement('span')
                    location.innerHTML = `<i class="bi bi-geo-alt"></i> ${resultItem.District}`

                    let branchType = document.createElement('span')
                    branchType.innerHTML = `<i class="bi bi-building"></i> ${resultItem.BranchType}`

                    let circle = document.createElement('span')
                    circle.innerHTML = `Circle: ${resultItem.Circle}`

                    let district = document.createElement('span')
                    district.innerHTML = `District: ${resultItem.District}`

                    let state = document.createElement('span')
                    state.innerHTML = `District: ${resultItem.State}`

                    div.appendChild(title)
                    div.appendChild(location)
                    div.appendChild(branchType)
                    div.appendChild(circle)
                    div.appendChild(district)
                    div.appendChild(state)
                    resultContainer.appendChild(div)
                }
            }
        })
    }
}

query.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        search()
    }
})