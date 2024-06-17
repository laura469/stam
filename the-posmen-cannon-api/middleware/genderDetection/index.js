const fetch= require('node-fetch')

async function checkGender(urls){
    const res = await fetch('https://api.clarifai.com/v2/users/dmty087x6xos/apps/7e3131538d55493d8e89c000f34881ac/workflows/Demographics/results',
        {
            method:'post',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Key 94e1ff055cee466eb75050b25a6099a7'
            },
            body:JSON.stringify({
                inputs: urls.map(url=> {
                       return  {
                            data: {
                                image: {
                                    url
                                }
                            }
                        }
                    }
                )
            })
        })
    const {results} = await res.json()
    const genderDetectResults = results.map(urlObj=>{
        if (!urlObj['outputs'][3]['data']['regions']) return undefined
        const url = urlObj.input.data.image.url
        const woman = urlObj['outputs'][3]['data']['regions'][0]['data']['concepts'][0]['name'] === 'Feminine'
        return {url, woman}
    })
    return genderDetectResults
}

module.exports = {
    checkGender
}
