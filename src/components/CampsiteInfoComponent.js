import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, Modal, ModalHeader, ModalBody, Breadcrumb, BreadcrumbItem, Button,Row, Form, FormGroup,Label, Input, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import{baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const maxLength=len=>val=>!val || (val.length <= len);
const minLength=len=>val=>val &&(val.length>=len);

    function RenderCampsite({campsite}){
        return(
        <div className="col-md-5 m-1">
            <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
        );
    }
            function RenderComments({comments, postComment, campsiteId}){
                if(comments){
                    return(
                    <div className="col-md-5 m-1">
                        <h4>Comments</h4>
                            <Stagger in>
                                {comments.map(comment=>{
                                    return(
                                        <Fade in key={comment.id} >
                                            <div>
                                                <p>{comment.text}<br/>
                                                    {comment.autor}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                                </p>
                                            </div>
                                        </Fade>
                                );
                                })}
                        </Stagger>
                        <CommentForm campsiteId={campsiteId} postComment={postComment} />
                       
                    </div>
                    );
                }
                    return <div />;
            }

            
                function CampsiteInfo(props){
                    if(props.isLoading){
                        return(
                            <div className="container">
                                <div className="row">
                                    <Loading />
                                </div>
                            </div>
                        )
                    }

                    if(props.errMess){
                        return(
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <h4>{props.errMess}</h4>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    if (props.campsite){
                        return(
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <Breadcrumb>
                                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                                    </Breadcrumb>
                                    <h2>{props.campsite.name}</h2>
                                    <hr />
                                </div>
                            </div>
                            <div className="row">
                                <RenderCampsite campsite={props.campsite} />
                                <RenderComments 
                                    comments={props.comments} 
                                    postComment = {props.postComment}
                                    campsiteId = {props.campsite.id}
                                />
                            </div>
                        </div>
                        );  
                    }
                        return <div />;
                }

               
               
                class CommentForm extends Component {
                    constructor(props){
                        super(props)

                        this.state={
                            isModelOpen:false
                        }
                   
                        this.toggleModal = this.toggleModal.bind(this);
                        this.handleSubmit= this.handleSubmit.bind(this);
                    }
                    toggleModal(){
                        this.setState({
                            isModalOpen: !this.state.isModalOpen
                        
                        });
                    }
                    
                    handleSubmit(values){
                        this.props.postComment(this.props.campsiteId, values.rating, values.author,values.text)
                        this.toggleModal();
                        
                    }

                    render(){
                        return(
                        <React.Fragment>   
                            <Button type="submit" outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg" />
                                Submit Comment
                            </Button>
                            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>
                                    Submit Comment
                                </ModalHeader>
                                    <ModalBody>
                                       <LocalForm onSubmit={(event)=>this.handleSubmit(event)}>
                                            <Row className="form-group">
                                                <Label htmlFor="Rating" md={2}
                                                    >Rating
                                                </Label>
                                                <Col md={10}>
                                                    <Control.select model=".rating"  name="rating"
                                                        className="form-control">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Control.select>
                                                </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Label htmlFor="author" md={2}
                                                        >Your Name
                                                    </Label>
                                                    <Col md={10}>
                                                        <Control.text model=".author" id="author" name="author"
                                                            placeholder="First Name"
                                                             className="form-control"
                                                             validators={{
                                                                 minLength:minLength(2),
                                                                 maxLength:maxLength(15)
                                                             }}>
                                                        </Control.text>
                                                        <Errors className="text-danger"
                                                                model=".author"
                                                                show="touched"
                                                                messages={{
                                                                    minLength: "Must be at least 2 characters",
                                                                    maxLength:" must be 15 characters or less"
                                                                }} />
                                                    </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Label htmlFor="comment" md={2}
                                                        >Comment
                                                    </Label>
                                                    <Col md={10}>
                                                        <Control.textarea model=".text" id="text" name="text"
                                                        row="6"
                                                        className="form-control">
                                                        </Control.textarea>
                                                    </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Col md={{size:10, offset:1}}>
                                                        <Button type="submit" color="primary">Submit</Button>
                                                    </Col>
                                                </Row>
                                        </LocalForm> 
                                    </ModalBody>
                            </Modal>
                        </React.Fragment>
                             
                        );
                    }
                }
            
        
export default CampsiteInfo;