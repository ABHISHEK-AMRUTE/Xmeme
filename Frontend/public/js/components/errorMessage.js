function errorMessage(str)
{
    const span = document.createElement('span')
    span.setAttribute('class',' w3-margin')
    span.innerHTML=str;

    return span;
}