const welcomeScreen = document.getElementById('welcomScreenId')
const mainScreen = document.getElementById('mainScreenId');
const hostedUrl = 'http://localhost:8081/';
const memeUrl = document.getElementById('url');
const name = document.getElementById('name');
const nameProfile = document.getElementById('nameProfile');
const caption = document.getElementById('caption')
const postMeme = document.getElementById('post')
const memeContainer = document.getElementById('memeContainer');
const refresh = document.getElementById('refresh');
var toEditReaction = 0;
var toEditID;


welcomeScreen.style.display = 'none'
mainScreen.style.display = 'none'

var username = localStorage.getItem('name');
console.log(username)
if(!username)
{
    welcomeScreen.style.display  = 'block'

}else{
    mainScreen.style.display = 'block'
    name.value = username;
    nameProfile.innerHTML = username;
}

function saveName(){
      const welcomeScreenNameField = document.getElementById('username')
      if(welcomeScreenNameField.value=="")
      {
          document.getElementById('errorInNameField').innerHTML="Name must not be empty"
      }else{
          localStorage.setItem('name',welcomeScreenNameField.value)
          username = welcomeScreenNameField.value;
          name.value = username;
          nameProfile.innerHTML = username;
          welcomeScreen.style.display = 'none'
          mainScreen.style.display = 'block'
      }
}



postMeme.addEventListener('click', function () {

    var str ="<ul>";

    if(name.value=="")
    {
        str = str+"<li>Name cannot be empty.</li>";
    }
    if(caption.value=="")
    {
        str  =  str + "<li>Caption cannot be empty, try some catchy lines.</li>";
    }
    if(url.value=="")
    {
        str = str + "<li>Url field cannot be empty.</li>";
    }
    str = str + "</ul>";
    // var obj = {
    //     name: name.value,
    //     caption: caption.value,
    //     url: memeUrl.value,
    //     reactions : 0
    // }
    // console.log(obj)
    if(str!="<ul></ul>")
    {
        document.getElementById('errorMessage').appendChild(errorMessage(str));
    }
    else{
        fetch(hostedUrl+'memes', {
            method: "POST",
            body: JSON.stringify({
                name: name.value,
                caption: caption.value,
                url: url.value,
                reactions:0
            }),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        }).then((res) => {
            res.json().then((b)=>{
                console.log(b)
                if(b.error)
                {
                    document.getElementById('errorMessage').appendChild(errorMessage(b.error));
                }else{
                document.getElementById('model').style.display='none'
                refreshFunction();
                document.getElementById('errorMessage').innerHTML="";
             }
            })
        })
    }
})




refresh.addEventListener('click', function () {
    refreshFunction()
    
})




memeUrl.addEventListener('input',function(){
    document.getElementById('preview').src = memeUrl.value
})
document.getElementById('editUrl').addEventListener('input',function(){
    console.log(document.getElementById('editUrl').value)
    document.getElementById('editImage').src = document.getElementById('editUrl').value;
})

function refreshFunction()
{
    memeContainer.innerHTML = "";
    fetch(hostedUrl+'memes').then((res) => {
        res.json().then((b)=>{

            if(b.length==0)
            {
                
                memeContainer.appendChild(getNoItemCard());
            }else{
            console.log(b[0].url)
            b.forEach(element => {
                memeContainer.appendChild(makeMemeCard(element.name,element.caption,element.url,element.id,element.reactions))  
            });
        }
        })
    })
}

refreshFunction()
function deleteMeme(str)
{
    fetch(hostedUrl+'memes/'+str, {
        method: "delete",
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
    }).then((res) => {
        res.json().then((b)=>{
            console.log(b)
            refreshFunction()
        })
    })
    
}

document.getElementById('editPost').addEventListener('click',function(){
  
    fetch(hostedUrl+'memes/'+toEditID, {
        method: "PATCH",
        body: JSON.stringify({
            reactions:toEditReaction,
            name:document.getElementById('editName').value,
            caption:document.getElementById('editCaption').value,
            url:document.getElementById('editUrl').value,
        }),
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
    }).then((res) => {
        res.json().then((b)=>{
            console.log(b)
            document.getElementById('editModel').style.display='none';
            refreshFunction()
        })
    })

})



function editMeme(str)
{
    console.log(str)
    document.getElementById('editModel').style.display  = 'block';
    fetch(hostedUrl+'memes/'+str).then((res)=>{
        res.json().then((element)=>{
            toEditID=str;
            document.getElementById('editName').value = element.name;
            document.getElementById('editCaption').value = element.caption;
            document.getElementById('editUrl').value = element.url;
            document.getElementById('editImage').src = element.url;
            toEditReaction = element.reactions;
        })
    })
}


function reaction(str)
{
    console.log(str)
    var  reactionCount = document.getElementById('reactionCount'+str).innerHTML
    console.log(reactionCount)
    var temp = parseInt(reactionCount.trim());
    temp = temp +1;
    fetch(hostedUrl+'memes/'+str, {
        method: "PATCH",
        body: JSON.stringify({
            reactions:temp
        }),
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
    }).then((res) => {
        res.json().then((b)=>{
            console.log(b)
        })
    })
    document.getElementById('reactionCount'+str).innerHTML = "  "+temp
}


function loadMyPosts()
{
    memeContainer.innerHTML = "";
    const headTitle = document.createElement('h3')
    headTitle.setAttribute('class','w3-text-grey  w3-margin')
    headTitle.innerHTML = "Showing your posts";
    memeContainer.appendChild(headTitle);
    
    console.log(username);
    fetch(hostedUrl+'memeByName/'+username).then((res)=>{
        res.json().then((elements)=>{
           
            if(elements.length==0)
            { 
                memeContainer.appendChild(getNoItemCard());
            }else
            {
            elements.forEach(element => {
                memeContainer.appendChild(makeMemeCard(element.name,element.caption,element.url,element.id,element.reactions))  
            });
            }
        })
    })
    
}


// memeContainer.appendChild(makeMemeCard("Abhishek Amrute" , "Cute pussy" , "https://homepages.cae.wisc.edu/~ece533/images/cat.png"))
// memeContainer.appendChild(makeMemeCard("Abhishek Amrute","My first boat","https://homepages.cae.wisc.edu/~ece533/images/boat.png"))