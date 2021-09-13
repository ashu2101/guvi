import React from 'react'
import axios from "axios";

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id:"",
            userId:"",
            body :"",
            title:""
        }
    }

    componentDidMount() {
        this.getPost();
    }

    //Method to get data from API
    // async getPost() {
     getPost= async ()=>{
        try {
            const res = await axios.get(API_URL);
            this.setState({ data: res.data });
            console.log(this.state.data);
        } catch (e) {
            console.log(e);
        }
    };

    //Method to Delete data from API
    // async deletePost(id){
     deletePost= async(id)=>{
        try {
            await axios.delete(`${API_URL}/{id}`);
            console.log(`Successfully deleted element with id ${id}`);
            //TO update  the table without making new api call
            let toupdate = [...this.state.data];
            toupdate = toupdate.filter((elem)=>elem.id!==id);
            // const toupdate = this.state.data.filter((elem)=>{ 
            //     if(elem.id!==id){
            //         return elem
            //     }});
            // console.log(toupdate);
            this.setState({data:toupdate});
        } catch (error) {
            console.log(`Id ${id} not found, ${error}`);
        }
    }

    // Method to add new row to table
    async addPost(){
        try {
            const res = await axios.post(API_URL,
                    {
                    firstName: 'Fred',
                    lastName: 'Flintstone'
                  });
            
        } catch (error) {
            console.log(`Error while adding new data, ${error}`);
        }
    }

    handleChange=({target: {name, value}})=>{
        this.setState({[name]:value});
    }

    render() {
        return (
            <div>
                <br/>
                <form>
                    <div>
                        <label>UserId : </label>
                        <input type="text" name="userId" 
                            value={this.state.userId} 
                            onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Title : </label>
                        <input type="text" name="title" 
                            value={this.state.title} 
                            onChange={this.handleChange}  />
                    </div>
                    <div>
                        <label>Body : </label>
                        <input type="text" name="body"  
                            value={this.state.body} 
                            onChange={this.handleChange} />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <br/>
                <hr/>
                <br/>
                <table border="1px">
                    <thead>
                    <tr>
                        <th>UserId</th>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map((element) => {
                            return(
                            <tr key={element.id}>
                                <td>{element.userId}</td>
                                <td>{element.id}</td>
                                <td>{element.title}</td>
                                <td>{element.body}</td>
                                <td>
                                    <input type="submit" value="Edit" />
                                    <input type="submit" value="Delete" onClick={()=>{this.deletePost(element.id) }} />
                                </td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </table>

            </div>
        )
    }
}

export default DataTable
