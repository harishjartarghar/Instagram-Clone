import React, { Component } from 'react'
import {
    ModalHeader,
    ModalBody,
    Modal
    
  } from "reactstrap";
class ModalLogout extends Component {
   constructor(props)
   {
       super(props);
       this.state={
        isModalOpen: false
      };
   }
    
      toggleModal=()=> {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      render(){
          
    return (
        <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    )
}
}

export default ModalLogout;
