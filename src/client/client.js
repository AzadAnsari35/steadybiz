import React,{Fragment} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "../client/containers/layout";


const MyApp = props => (
   
  <BrowserRouter>  
     <Layout/>      
  </BrowserRouter>
  
);

ReactDOM.render(<MyApp />, document.getElementById("app"));