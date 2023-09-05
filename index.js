const url="https://reqres.in/api/users?page=2";
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
	let authors = data;
    for (let index = 0; index < data.data.lenght; index++) {
        
        const element = array[index];
        
    }
console.log(data.data[0].email);
})
.catch(function() {

});
