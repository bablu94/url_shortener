console.log("Client side URL Shortener script is loaded!");

const shortenerForm = document.querySelector("form")
const longUrl = document.querySelector("input")
const messageOne = document.querySelector("#message-1")

shortenerForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    if(longUrl.value.length !== 0)
    {   
        
        messageOne.textContent = "Preparing...";

        // $.get("http://tinyurl.com/api-create.php?url=" + url, function(shorturl){
        //     messageOne.textContent = shorturl;
        //     });

        // $.ajax({
        //     url: "https://goolnk.com/api/v1/shorten",
        //     method: "POST",
        //     crossDomain: true,
        //     data: jQuery.param({ url: longUrl.value })
        
        //     }).done((result_url) =>{
        //         var shortURL = result_url;
                    
        //         var link = "<a href='"+ shortURL +"' target='_blank'>" + shortURL +"</a>";
        //         $("#message-1").replaceWith(link);

        //     }).error( (error) =>{
        //         console.log(error);
        //     })

        
        fetch(`/url?longurl=${longUrl.value}`).then((response) =>
        {
            console.log(response);
            response.json().then( (data) =>
            {
                if(data.error)
                {
                    messageOne.textContent = "Error getting shortened URL!";
                }
                else
                {
                    var link = data.shortURL;
                    messageOne.textContent = "";
                    //messageOne.textContent = data.shortURL;
                    $('<a href="'+ link +'" target="_blank"">'+ link +'</a>').appendTo($('#message-1'));
                }
            })
        })
        
        
    }

    else{
        
        messageOne.textContent = "Enter a URL";
    }

})

