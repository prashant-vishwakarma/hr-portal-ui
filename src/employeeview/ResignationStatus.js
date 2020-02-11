import React, {useEffect,useState} from 'react';
import {Steps} from 'antd';

const ResignationStatus = (props) => {
    let copyArr=[];
    const initialArray=[{
        title: 'Submit Application',
        content: 'Apply for Resignation.',
        Updated:false,
    }, {
        title: 'Manager Approval.',
        content: 'Manager yet to Approve.',
        status: "wait",
        Updated:false,

    }, {
        title: 'Exit Form',
        content: 'Exit form to be filled',
        status: "wait",
        Updated:false,

    }, {
        title:'MANAGER APPROVAL',
        content:'department approval awaits',
        status: "wait",
        Updated:false,

    },{
       title:'finance Approval',
       content:'department approval awaits',
       status: "wait",
        Updated:false,

    },{
       title:'Admin Approval',
       content:'department approval awaits',
       status: "wait",
        Updated:false,

    },{
       title:'It Approval',
       content:'department approval awaits',
       status: "wait",
        Updated:false,

    },{
       title:'HR Approval',
       content:'department approval awaits',
       status: "wait",
        Updated:false,

    }];

    const [steps,setSteps] = useState(initialArray);

    const Step = Steps.Step;
    function MapStatusValue() {
        var Obj= JSON.parse(localStorage.resignationForUser);
            //when application is withdrawn.
            if(Obj.status!=="SUBMITTED"){
                setSteps(initialArray);
            }
            //Application submitted.
            if(Obj.status==="SUBMITTED" && !steps[0].Updated){
                copyArr=[...steps];
                copyArr[0]={title:'Submitted',content:'' ,status:"finish", Updated:true};
                setSteps(copyArr);
            }
            //Initial  manager approval
            if(Obj.status==="SUBMITTED" && Obj.managerApproved && !steps[1].Updated){
                copyArr=[...steps];
                copyArr[1]={title:'Manager Approved.',content:'' ,status:"finish",Updated:true};
                setSteps(copyArr);
            }
            //exit form availability.
            if(Obj.status==="SUBMITTED" && Obj.managerApproved /* check release date */ && !steps[2].Updated){
                copyArr=[...steps];
                copyArr[2]={title:'Exam Form', content:'',status:"finish",Updated:true};
                setSteps(copyArr);
            }
            //Manager approval department side.
            if(Obj.status==="SUBMITTED" && Obj.managerApproved /* check release date */ && Obj.managerClearance.approvalDate  && !steps[3].Updated){
                copyArr=[...steps];
                copyArr[3]={title:"Manager Approved",
                    content:"handOverComment:"+Obj.managerClearance.handOverComment +"\nlicenceRevokeComment:"+Obj.managerClearance.licenceRevokeComment+"\nnoticePeriodPayoutRecoveryComment:"+Obj.managerClearance.noticePeriodPayoutRecoveryComment ,
                    status:"finish",
                    Updated:true};
                setSteps(copyArr);

            }
            //finance approval
            if(Obj.status==="SUBMITTED" && Obj.managerApproved /* check release date */ && Obj.financeClearance.approvalDate  && !steps[4].Updated){
                copyArr=[...steps];
                copyArr[4]={title:"FINANCE Approved",
                    content: " advanceAmountComment:"+Obj.financeClearance.advanceAmountComment+" giftAwardComment"+Obj.financeClearance.giftAwardComment+
                        " joiningBonusComment"+Obj.financeClearance.joiningBonusComment+" loanAmountComment"+Obj.financeClearance.loanAmountComment+
                        " mobileHandsetRecoveryComment"+Obj.financeClearance.mobileHandsetRecoveryComment+" taxProofInternetBillComment"+Obj.financeClearance.taxProofInternetBillComment+
                        " trainingReimbursementComment"+Obj.financeClearance.trainingReimbursementComment+" visaOutStandingAmountComment"+Obj.financeClearance.visaOutStandingAmountComment,
                   status:"finish",
                    Updated:true};
                setSteps(copyArr);
            }
            //admin approval
            if(Obj.status==="SUBMITTED" && Obj.managerApproved /* check release date */ && Obj.adminClearance.approvalDate  && !steps[5].Updated){
                copyArr=[...steps];
                copyArr[5]={title:"ADMIN Approved",
                    content:"accessCardDrawerKeyComment"+Obj.adminClearance.accessCardDrawerKeyComment+" cabFeesComment"+Obj.adminClearance.cabFeesComment+
                    " otherAssetsComment"+Obj.adminClearance.otherAssetsComment+" parkingStickerComment"+ Obj.adminClearance.parkingStickerComment,
                   status:"finish",
                    Updated:true};
                setSteps(copyArr);
            }
            //IT Approval
            if(Obj.status==="SUBMITTED" && Obj.managerApproved /* check release date */ && Obj.iTclearanceResponse.approvalDate && !steps[6].Updated ){
                copyArr=[...steps];
                copyArr[6]={title:"IT Approved",
                    content: "accessoriesComments"+ Obj.iTclearanceResponse.accessoriesComments+" headphoneComments"+ Obj.iTclearanceResponse.headphoneComments+
                        " jiraStatusComment​"+Obj.iTclearanceResponse.jiraStatusComment+" licenceComment"+Obj.iTclearanceResponse.licenceComment,
                    status:"finish",
                    Updated:true};
                setSteps(copyArr);


            }
            //HR Approval
            if(Obj.status==="SUBMITTED" && Obj.managerApproved /* check release date */ && Obj.hrClearance.approvalDate  && steps[7].Updated){
                copyArr=[...steps];
                copyArr[7]={title:"HR  Approved",
                    content: "exitInterviewFormComments"+Obj.hrClearance.exitInterviewFormComments+"experienceLetterComments"+ Obj.hrClearance.experienceLetterComments+
                       "leaveAvailedCL"+Obj.hrClearance.leaveAvailedCL + "leaveAvailedEL"+Obj.hrClearance.leaveAvailedEL+"leaveBalanceCL"+Obj.hrClearance.leaveBalanceCL+
                    "leaveBalanceEL" + Obj.hrClearance.leaveBalanceEL + "leaveEligibleCL"+Obj.hrClearance.leaveEligibleCL + "leaveEligibleEL"+Obj.hrClearance.leaveEligibleEL +
                    "offBoardingComments"+Obj.hrClearance.offBoardingComments,
                    status:"finish",
                    Updated:true};
                setSteps(copyArr);
            }

    }

    useEffect(() => {
        MapStatusValue();
    },);

  //  let description="You Have Submitted your Resignation.";
    return (
        <div style={{"margin-left": "10%"}}>
            <Steps direction="vertical" >
                    {steps.map(item => <Step key={item.title} title={item.title} description={item.content} status={item.status}/>)};
            </Steps>
        </div>
    );
};

export default ResignationStatus;