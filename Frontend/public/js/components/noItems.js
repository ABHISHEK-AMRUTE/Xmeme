function getNoItemCard(){


    const outerContainer = document.createElement('div')
    const lottie = document.createElement('lottie-player')
    const text = document.createElement('span')

    outerContainer.setAttribute('class',' w3-padding w3-margin')
    outerContainer.setAttribute('style','text-align: center;')
    lottie.setAttribute('src','https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json')
    lottie.setAttribute('background',"transparent")
    lottie.setAttribute( 'speed',"1")
    lottie.setAttribute('style',"width: 100%;")
    lottie.setAttribute('loop','ture')
    lottie.setAttribute('autoplay','ture')

    text.setAttribute('class','w3-text-grey w3-large')
    text.innerHTML = "No memes yet!<br> Start posting now."
    
    outerContainer.appendChild(lottie)
    outerContainer.appendChild(text)
    return outerContainer;
}

// <div class=" w3-padding w3-margin" style="text-align: center;">
// 
// <lottie-player src=""       loop  autoplay></lottie-player>
// <span class=""></span>   
// </div>