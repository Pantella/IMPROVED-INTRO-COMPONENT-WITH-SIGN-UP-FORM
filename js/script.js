document.addEventListener('DOMContentLoaded',()=>{

    const   form = document.getElementById("component-form");
 
    let     msgErrEmpty=' cannot be empty',
            msgErrSpaces=' cannot be only spaces',
            msgErrShort=' cannot be less than 2 letters long',
            msgErrLong=' cannot be more than 50 letters long',
            msgErrEmail='Looks like this is not an email',
            msgErrPsw='This is not a valid password';

    const   fieldsList = Array.from(document.getElementsByTagName("input")).filter((domEl)=>{
        return domEl.type!="submit";
    });


    window.addEventListener('keydown',(evt)=>{
        if (evt.key==='Enter') {
            evt.preventDefault();
        }
    });


    form.addEventListener('focusin',(evt)=>{
        let field = evt.target;

        field.classList.remove('error');
        field.nextElementSibling.classList.add('hidden-icon');
    });


    form.addEventListener('submit',formHandler);


    function formHandler(evt) {
        evt.preventDefault();

        let validation = true ;

        let fieldsListObj = fieldsList.map( (domEl)=>{
            let domElObj = {};

            domElObj.name = domEl.name.replace('-',' ');
            domElObj.obj = domEl;
            domElObj.objErr = domEl.parentElement.lastElementChild;
            domElObj.valState = false;
            domElObj.val = '';
            domElObj.msgErr = '';

            return domElObj
        } );

        let formFields = fieldsListObj.map((elemObj)=>{
            switch (elemObj.name) {
                case 'First Name':
                    return firstNameValidation(elemObj);
                case 'Last Name':
                    return lastNameValidation(elemObj);
                case 'Email':
                    return emailValidation(elemObj);
                case 'Password':
                    return passwordValidation(elemObj);
            }
        });

        formFields.forEach( (elem)=>{
            if (!elem.valState) {
                elem.obj.value='';
                elem.objErr.textContent=elem.msgErr;
                // !!!
                elem.obj.classList.add('error');
                elem.obj.setAttribute('placeholder','');
                elem.obj.nextElementSibling.classList.remove('hidden-icon');
                validation=false;
            } else {
                elem.objErr.textContent='';
                // !!!
                elem.obj.classList.remove('error');
                elem.obj.nextElementSibling.classList.add('hidden-icon');
            }
        } );

        let prom = new Promise( (resolve,reject)=>{
            if (validation) {
                setTimeout( ()=>{
                    resolve('Data sent');
                },4000 );
            } else {
                reject('Input Error');
            }
        } );

        prom
        .then( (msg)=>{
            formFields.forEach( (elem)=>{
                if (elem.name!='Password') elem.obj.value=msg;
            } );
            setTimeout( ()=>{
                formFields.forEach( (elem)=>{
                    elem.obj.value='';
                    elem.obj.setAttribute('placeholder',elem.name);
                } );
            },1000 );
        } )
        .catch( (err)=>{
            console.error(err);
        } );

    }

    function firstNameValidation(firstNameObj) {

        let nameValue = firstNameObj.obj.value;

        if ( isEmpty(nameValue) ) {
            firstNameObj.msgErr = `${firstNameObj.name} ${msgErrEmpty}`;
        } else if ( isOnlySpaces(nameValue) ) {
            firstNameObj.msgErr = `${firstNameObj.name} ${msgErrSpaces}`;
        } else if ( isShorterThan(nameValue,2) ) {
            firstNameObj.msgErr = `${firstNameObj.name} ${msgErrShort}`;
        } else if ( isLongerThan(nameValue,50) ) {
            firstNameObj.msgErr = `${firstNameObj.name} ${msgErrLong}`;
        } else {
            firstNameObj.valState = true ;
            firstNameObj.val = nameValue ;
        }

        return firstNameObj
    }

    function lastNameValidation(lastNameObj) {

        let lastNameValue = lastNameObj.obj.value ;

        if ( isEmpty(lastNameValue) ) {
            lastNameObj.msgErr = `${lastNameObj.name} ${msgErrEmpty}`;
        } else if ( isOnlySpaces(lastNameValue) ) {
            lastNameObj.msgErr = `${lastNameObj.name} ${msgErrSpaces}`;
        } else if ( isShorterThan(lastNameValue,2) ) {
            lastNameObj.msgErr = `${lastNameObj.name} ${msgErrShort}`;
        } else if ( isLongerThan(lastNameValue,50) ) {
            lastNameObj.msgErr = `${lastNameObj.name} ${msgErrLong}`;
        } else {
            lastNameObj.valState = true ;
            lastNameObj.val = lastNameValue ;
        }

        return lastNameObj
    }

    function emailValidation(emailObj) {

        let emailValue = emailObj.obj.value ;

        let regExMail = "[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+" ;

        if ( isEmpty(emailValue) ) {
            emailObj.msgErr = `${emailObj.name} ${msgErrEmpty}`;
        } else if ( isOnlySpaces(emailValue) ) {
            emailObj.msgErr = `${emailObj.name} ${msgErrSpaces}`;
        } else if ( !isRegExCompliance(emailValue,regExMail) ) {
            emailObj.msgErr = `${msgErrEmail}`;
        } else {
            emailObj.valState = true ;
            emailObj.val = emailValue ;
        }

        return emailObj
    }

    function passwordValidation(pswObj) {

        let pswValue = pswObj.obj.value ;

        let regExPsw = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$" ;

        if ( isEmpty(pswValue) ) {
            pswObj.msgErr = `${pswObj.name} ${msgErrEmpty}`;
        } else if ( isOnlySpaces(pswValue) ) {
            pswObj.msgErr = `${pswObj.name} ${msgErrSpaces}`;
        } else if ( !isRegExCompliance(pswValue,regExPsw) ) {
            pswObj.msgErr = `${msgErrPsw}`;
        } else {
            pswObj.valState = true ;
            pswObj.val = pswValue ;
        }

        return pswObj
    }


    function isEmpty(val) {
        if (val=='') return true
    }
    function isShorterThan(val,len) {
        if (val.length<len) return true
    }
    function isLongerThan(val,len) {
        if (val.length>len) return true
    }
    function isOnlySpaces(val) {
        if (val.replace(/\s/g,'')=='')
        return true
    }
    function isRegExCompliance(val,pattern) {
        let regex = new RegExp(pattern);
        return regex.test(val)
    }

});
