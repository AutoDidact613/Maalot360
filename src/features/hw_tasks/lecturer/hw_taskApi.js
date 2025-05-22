

const getAllHW_tasks = async () => {

    // axios.get("http://localhost:3000/task/getAll").then(res => {
    //     console.log(res);

    //   }).catch(e => {
    //     alert("שגיאת שרת, נסה במועד מאוחר יותר");
    //     console.log(e);
    //   })
    try {
        const res = await axios.get("http://localhost:3000/task/getAll")
    }
    catch (e) {
        console.log(e);
    }
}