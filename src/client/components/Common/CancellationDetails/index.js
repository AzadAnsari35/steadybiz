import React from 'react'
import { Text, Panel, IconWithBackground, Image, Button, CustomCheckbox } from 'Widgets';

const CancellationDetails = () => {
    return (
        <div className="CancellationDetails">
            <div className=" d-flex justify-content-between">
                <div className="CancellationDetails-left font-primary-medium-16">
                <Text showLeftBorder text="CANCEL &amp; REFUND" className="mb-18" />
                <div className="pb-10">Total Fare</div>
                <div className="pb-10">Net Amount Paid [For Booking]</div>
                <div className="pb-10">Commission Given [For Booking]</div>
                <div className="pb-10">GST / VAT Refundable Amount</div>
                <div className="pb-10">Service Charges [For Cancellation]</div>
                <div className="pb-10">Cancellation Charges</div>
            </div>

            <div className="CancellationDetails-right  font-primary-semibold-16 pt-36"> 
            <div>
                <span className="pb-10" style={{paddingRight:120}} >AED</span>
                <span>4,200</span>
            </div>
            <div>
                <span className="pb-10" style={{paddingRight:120}} >AED</span>
                <span>4,200</span>
            </div>

            <div className=" d-flex justify-content-between">
                <span  style={{paddingRight:70}} >AED</span>
                <div style={{width:"50%"}} className="d-flex justify-content-between">
                <span className="pr-10">( - )</span>
                <span>4,200</span>
                </div>

            </div>

            <div className=" d-flex justify-content-between">
                <span  style={{paddingRight:70}} >AED</span>
                <div style={{width:"50%"}} className="d-flex justify-content-between">
                <span className="pr-10">( + )</span>
                <span>16.25</span>
                </div>

            </div>

            <div className=" d-flex justify-content-between">
                <span  style={{paddingRight:70}} >AED</span>
                <div style={{width:"50%"}} className="d-flex justify-content-between">
                <span>( + )</span>
                <span>60.00</span>
                </div>

            </div>
            <div className=" d-flex justify-content-between">
                <span  style={{paddingRight:70}} >AED</span>
                <div style={{width:"50%"}} className="d-flex justify-content-between">
                    <span>( - )</span>
                    <span>1050.00</span>
                </div>
            </div>
            </div>
            </div>
            <div className="horizontal-grey-divider"></div>
            <div className="text-align-right pt-20"><span className="font-primary-regular-20 pr-8">Net Refundable amount</span> <span className="font-primary-semibold-20">AED 2,479.81</span></div>
            <div className="d-flex align-items-center font-primary-medium-16 justify-content-end pt-40">
            <CustomCheckbox
            
               className="mb-0"
                onChange={()=> console.log("q")}
                useReactHookForm={false}
                name={name}/>
                
                I have read, accepted and agreed the <span className="link-text"> Terms and Conditions.</span>
            <Button
                  text="Cancel &amp; Refund"
                  // onClick={handleCancelClick}
                  className="ml-28"
                />
            </div>
        </div>
    )
}

export default CancellationDetails
