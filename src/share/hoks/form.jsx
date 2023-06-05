import React from 'react';

export default function withForm(Comp,initialState,schema){
    return class extends React.Component{
        state={
            form: initialState,
            error: undefined
        }
        // debauns
        changeHandlerFactory=(name)=>{
            let id;
            return (e)=>{
                const newValue=e.target.value;
                if(id){clearTimeout(id);id=null;}
                id=setTimeout(()=>{
                    this.setState(({form})=>{
                        return {form:{...form,[name]:newValue}};
                    });
                    id=null;
                },200) ;

            }
        }
        getFormState=()=>{
            return this.state.form;
        }
        getFormErrorState=()=>{
            return this.state.error;
        }
        runValidations=()=>{
            return schema.validate(this.state.form,{abortEarly:false})
            .then(()=>{
                this.setState({error:undefined});
                return this.state.form})
            .catch(err=>{
              const error=  err.inner.reduce((acc,{path,message})=>{
                    acc[path]=(acc[path]||[]).concat(message);
                    return acc;
                },{});  
                this.setState({error})    
            })

        }
        render(){
            return <Comp {...this.props} getFormErrorState={this.getFormErrorState} changeHandlerFactory={this.changeHandlerFactory} getFormState={this.getFormState} runValidations={this.runValidations}></Comp>
        }
    }
}