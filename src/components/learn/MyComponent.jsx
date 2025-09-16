import "./style.css"

const MyComponent = () => {
    // const hoidanit = "Eric";
    // const hoidanit = 25;
    // const hoidanit = true;
    // const hoidanit = [1, 2, 3];

    const hoidanit = {
        name: "Eric",
        age: 25
    };

    return (
        <>
            <div>{JSON.stringify(hoidanit)} & hoi dan it</div>
            <div>{console.log("Eric")}</div>
            <div className="child" style={{ borderRadius: " 10px" }}>child</div>
        </>
    );
}


export default MyComponent;