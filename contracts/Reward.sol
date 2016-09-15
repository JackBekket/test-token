contract Reward { 
  address public organizer;
  mapping (address => uint256) public MemberGot;
 
  mapping (address => uint) public OrgDeposit;
  
  uint public numRegistrants;

  uint public quota;

  // so you can log these events
  event Deposit(address _from, uint _amount); 
  event Refund(address _to, uint _amount);
  event WasSent(address _to, uint _amount);
  event MemberDepo(address _to, uint _amount);
  

  function Reward() { // Constructor
    organizer = msg.sender;
   
    numRegistrants = 0;
  }
  
  function DepositFund() public returns (bool success) {
    OrgDeposit[msg.sender] = msg.value; //vznos deposita org.
    Deposit(msg.sender, msg.value); //zapis v log dlya statistiky
    return true;
  }
 
 
 

 

   
  function gotMember(address memberad, uint amount) public {
   MemberGot[memberad] = amount;
     
   numRegistrants++;
   MemberDepo(memberad, amount);
   
  }
   

  function rewardMember(address recipient, uint amount) public {
//  if (msg.sender != organizer) {return;} //contrat execute only by organizer themselves
   if (MemberGot[recipient] == amount) {
    address myAddress = this;
    
    if (myAddress.balance >= amount) {
    recipient.send(amount);
    MemberGot[recipient] = 0;
    numRegistrants--;
    WasSent(recipient, amount);
   }
  }
 }

 
 
  function destroy() { // so funds not locked in contract forever
    if (msg.sender == organizer) {
      suicide(organizer); // send funds to organizer
    }
  }
}
