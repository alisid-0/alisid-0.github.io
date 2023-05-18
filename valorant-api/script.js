
// variables

const body = document.querySelector(`body`)
const button = document.querySelector(`button`)

const agentName = document.getElementById(`agent-section`)
const agentInput = document.querySelector(`input`)
const agentDiv = document.querySelector(`.agent`)
const agentImg = document.getElementById(`agent-img`)
const agentRoleDescDiv = document.getElementById(`agent-role`)
const roleTitle = document.querySelectorAll(`.role-title`)
const agentDesc = document.getElementById(`agent-description`)

const agentPortrait = document.getElementById(`agent-portrait`)

const abilityDiv = document.querySelector(`.abilities`)
const abilitySection = document.getElementById(`abilities-header`)
const abilitySectionDiv = document.getElementById(`abilities-spread`)



//  functionality

button.addEventListener(`click`, async () => {
    let agent = agentInput.value
    const agentList = await axios.get(`https://valorant-api.com/v1/agents?isPlayableCharacter=true`)
    const agentData = agentList.data.data
    for(let i of agentData){
        if (agent.toLowerCase() == i.displayName.toLowerCase()){
            agentDesc.innerText = `${i.description}` 
            agentImg.src = `${i.displayIconSmall}`
            colorDiv(agentPortrait,1,i)
            agentPortrait.style.backgroundImage = `url(${i.bustPortrait})`
            colorDiv(body,0,i)
            body.style.backgroundImage = `url(${i.background})`
            colorDiv(agentDiv,3,i)
            colorText(agentDesc,0,i)
            for(let j of roleTitle){
                j.innerText = `${i.role.displayName}`
                j.style.color = `#${i.backgroundGradientColors[0]}`
            }
            agentName.innerText = `${i.displayName}`
            colorText(agentName,0,i)
            colorDiv(abilityDiv,3,i)
            colorText(abilitySection,0,i)
            abilitySection.innerText = `Abilities`
            const ability = document.createElement(`div`)
            abilitySectionDiv.innerHTML = ""
            abilitySectionDiv.appendChild(ability)
            for (let j of i.abilities){
                console.log(j)
                ability.classList.add(`ability`)
                const abilityNameImg = document.createElement(`div`)
                abilityNameImg.classList.add(`ability-name-img`)
                const abilityName = document.createElement(`h3`)
                const abilityImg = document.createElement(`img`)
                abilityImg.classList.add(`ability-img`)
                abilityImg.src = `${j.displayIcon}`
                abilityNameImg.appendChild(abilityName)
                abilityNameImg.appendChild(abilityImg)
                ability.appendChild(abilityNameImg)
                abilityName.innerText = `${j.displayName}`
                const abilityDesc = document.createElement(`h4`)
                abilityDesc.innerText = `${j.description}`
                abilityDesc.classList.add(`abilityDesc`)
                ability.appendChild(abilityDesc)
                colorText(abilityName,1,i)
                colorText(abilityDesc,0,i)
            }
        }
    }
})

const colorText = (item, gradient = 0, index = i) =>{
    item.style.color = `#${index.backgroundGradientColors[gradient]}`
}

const colorDiv= (div, gradient = 0, index = i) =>{
    div.style.backgroundColor = `#${index.backgroundGradientColors[gradient]}`
}