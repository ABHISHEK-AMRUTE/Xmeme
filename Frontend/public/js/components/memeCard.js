function makeMemeCard(name, captionString, memeUrl,id,reactions) {

   const outerContainer = document.createElement('div');
   const image = document.createElement('img');
   const reactionCont = document.createElement('div');
   const span = document.createElement('span');
   const header = document.createElement('div');
   const  nameContainer = document.createElement('div');
   const nameField = document.createElement('div');
   const dots = document.createElement('div');
   const  caption = document.createElement('div');
   const button = document.createElement('button');
   
   const outerDropDown = document.createElement('div')
   const dropDownContent = document.createElement('div')
   const hoverText = document.createElement('span')
   const editItem = document.createElement('div')
   const deleteItem = document.createElement('div')

   outerContainer.setAttribute('class' ,'w3-border w3-white w3-card-2 w3-round  w3-margin');
   dropDownContent.setAttribute('class','w3-dropdown-content w3-bar-block w3-border')
   editItem.setAttribute('class','w3-button w3-bar-item')
   editItem.setAttribute('onclick','editMeme("'+id+'")')
   deleteItem.setAttribute('class','w3-button w3-bar-item')
   deleteItem.setAttribute('onclick','deleteMeme("'+id+'")')
   
   header.setAttribute('class','w3-padding')
   nameContainer.setAttribute('class','w3-row')
   nameField.setAttribute('class','w3-col s6 l6 m6 w3-large memeName')
   dots.setAttribute('class',' w3-col s6 l6 m6')
   dots.setAttribute('style','text-align: right;')
   outerDropDown.setAttribute('class','w3-dropdown-hover')
   hoverText.setAttribute('class','w3-large w3-button w3-white')

   caption.setAttribute('class','w3-text-grey')
   image.setAttribute('class','memeImage')
   image.setAttribute('src',memeUrl)
   image.setAttribute('width','100%')
   reactionCont.setAttribute('class','w3-padding')
   span.setAttribute('class','w3-large')
   span.setAttribute('id','reactionCount' + id)

   button.setAttribute('onclick','reaction("'+id+'")')
   button.setAttribute('class','memebutton')
    
   nameField.innerHTML = "<b>" + name+"</b>";
   hoverText.innerHTML = "<B>...</B>"
   caption.innerHTML = captionString
   span.innerHTML = "  "+reactions;
   button.innerHTML = "😂"
   editItem.innerHTML="Edit"
   deleteItem.innerHTML="Delete"
   
   dropDownContent.appendChild(editItem)
   dropDownContent.appendChild(deleteItem)
   outerDropDown.appendChild(hoverText)
   outerDropDown.appendChild(dropDownContent)
   dots.appendChild(outerDropDown)

   reactionCont.appendChild(button)
   reactionCont.appendChild(span)
   nameContainer.appendChild(nameField)
   nameContainer.appendChild(dots)
   header.appendChild(nameContainer)
   header.appendChild(caption)
   outerContainer.appendChild(header)
   outerContainer.appendChild(image)
   outerContainer.appendChild(reactionCont)


    return outerContainer;

}
               
