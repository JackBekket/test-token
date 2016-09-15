var accounts;
var account;
var balance;
// var tokend;
 var MyTokenInstance;

 var senderWei;
 var recipientWei;

 var deci;

 var am_root;
 var mroot;


window.onload = function() {
// Setting up web3 providers
  var Web3 = require('web3');
  // create an instance of web3 using the HTTP provider.
  // NOTE in mist web3 is already available, so check first if its available before instantiating
  //var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  //var web3= new Web3();


  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  //Get Accounts
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];


 $("#transfer_to").val(accounts[1]);
$("#mint_to").val(accounts[0]);


    //Get address
      var token = MyAdvancedToken.at(MyAdvancedToken.deployed_address);

// var token = MyAdvancedToken.at(0xe2df825a4f1e8c7f40d4bb2fa90654cb368597ba);

    //  console.log(MyAdvancedToken.deployed_address);
      //console.log(token);
    //Set adress of deployed contract
    $("#tokdAddress").html(MyAdvancedToken.deployed_address);
    //Creating instance
     myTokenInstance=token;

console.log(myTokenInstance);


//Set deci
deci=3;

//Set rules of transform numbers
DeciPow(deci);

    //Check Values
  //  checkValues();

    //Check Total Supply
    totalSup();

   //refresh Balance
    refreshBalance();

//refresh All Balance
// refreshAllBalance ();


//deci = myTokenInstance.decimals.call();
//deci=myTokenInstance.getDecimals.call();
//console.log('decimals:');
//console.log(deci);

   });
//

    //Warmig up UI
    $("#transfer").click(function() {
    		var val = $("#transfer_am").val();
        val=transformIn(val);
    //    console.log("transfer_val:");
    //    console.log(val);
    		var to = $("#transfer_to").val();
    		sendCoin(to, val);
    	});

//

   $("#mint").click(function(){
     var val = $("#mint_am").val();
     val=transformIn(val);
     var to = $("#mint_to").val();
     mintCoin(to, val);
   });

   $("#ProcTask").click(function(){
     var val = $("#out_am").val();
     val=transformIn(val);
  //   var to = $("#mint_to").val();
     var to = $("#cpid").val();
  //   console.log('click okay');
     ProcTask(to, val);
   });

   $("#ProcAll").click(function(){

   ProcAll();



   });


//  var tokenDecl=
// function(token) {
//    console.log(token);
//      myTokenInstance = token;
  //    checkValues();
//  };
//  myTokenInstance = tokenDecl(token);
//  console.log(myTokenInstance);
//  tokenDecl(token);

  };

function setStatus(message) {
//  var status = document.getElementById("status");
//  status.innerHTML = message;
  $("#status").html(message);
};

function setStatusPos(pos, msg){
$(pos).html(msg);

};

function checkValues() {
  myTokenInstance.owner.call().then(

    function(organizer) {
      $("input#tokdOrganizer").val(organizer);
      return myTokenInstance.getBalance.call(account, {from: account});
  //    return myTokenInstance.numRegistrants.call();
  })
     .then(
       function(bal) {
         var be=bal.valueOf();
         $("#balance").html(be);
         return myTokenInstance.owner.call();

       });
}

function refreshBalance(){

 myTokenInstance.getBalance.call(account, {from: account}).then(function(value) {
   // be = balance_element
var be=value.valueOf();
//console.log("be:");
//console.log(be);
var be_val;
be_val=transformOut(be);
//console.log("be_val");
//.log(be_val);

// senderWei=web3.toWei(be);
//console.log('balance:');
//console.log(be);
$("#balance").html(be_val);
//console.log(value);
//console.log(be);
}).catch(function(e){
console.log(e);
setStatus("Error getting balance; see log.");

});
}

function difBalance(nacc, numa){
  myTokenInstance.getBalance.call(nacc, {from: account}).then(function(value) {
    // be = balance_element
 var be=value.valueOf();


 $(numa).html(be);
 //console.log(value);
 //console.log(be);
 }).catch(function(e){
 console.log(e);
 setStatus("Error getting balance; see log.");

 });
}

function refreshAllBalance(){
for(var i=0;i<3;i++){
  myTokenInstance.getBalance.call(accounts[i], {from: account}).then(function(value) {
    // be = balance_element
 var be=value.valueOf();
 var numa= "#bal".i;
 console.log(numa);
 $(numa).html(be);
 //console.log(value);
 //console.log(be);
 }).catch(function(e){
 console.log(e);
 setStatus("Error getting balance; see log.");

 });
}



}

function totalSup(){
var msg="Инициализация";
var pos="#totalSup";
setStatusPos(msg, pos);
return myTokenInstance.totalSupply.call().then(
function (sup){
  val=sup.valueOf();
  msg=transformOut(val);
//msg=sup;
//console.log(sup);
//console.log(msg);
setStatusPos(pos, msg);

});

}

//Power to Decimals!
function DeciPow(deci) {
   mroot=Math.pow(10,deci);
   return mroot;

}



// to Wei
function transformIn(val) {
val=val*mroot;
//console.log("In:");
//console.log(val);
return val;


}

//from Wei
function transformOut(val) {

  // var am_prime=val;
   val=val/mroot;
//console.log("Out:");
//.log(val);
   return val;


}


 function sendCoin(to, val) {
//  var meta = MetaCoin.deployed();


//console.log(to);
//console.log(val);

var msg;
var pos = "#transfer_result";
var msg_transfer;
setStatus("Initiating transaction... (please wait)");
// msg_transfer="Инициализация (пожалуйста,подождите)";
// $("#transfer_result").html(msg_transfer);
msg="Инициализация (пожалуйста,подождите)";
setStatusPos(pos,msg);
// getBalSenderWei();
//getBalRecipientWei(to);
myTokenInstance.transfer(to, val, { from: account}).then(
  function (){
   setStatus("Transaction complete!");

  // msg_transfer="Транзакция выполнена";
  // $("#transfer_result").html(msg_transfer);
  msg="Транзакция выполнена";
  setStatusPos(pos,msg);
   refreshBalance();
 }).catch(function(e) {
     console.log(e);
     setStatus("Error sending coin; see log.");
    // msg_transfer="Ошибка при отправке, смотри консоль";
    // $("#transfer_result").html(msg_transfer);
    msg="Ошибка при отправке, смотри консоль";
    setStatusPos(pos,msg);
   });
  }

function mintCoin(to, val){
var msg;
var pos="#mint_result";
msg="Инициализация, ждите";
setStatus(msg);
setStatusPos(pos, msg);
var cb;  // cb - баланс до чеканки


//запрашиваем баланс до чеканки
 myTokenInstance.getBalance.call(to).then(
function (prev){
 cb=prev; //запоминаем старый баланс
 myTokenInstance.mintToken(to, val, {from:account}); //
 console.log('val=');
  console.log(val);

}).then(
   function(){
msg="Чеканка";
  setStatus(msg);
  setStatusPos(pos, msg);
  refreshBalance();
  totalSup();
}).then(

   function (check){
    return myTokenInstance.getBalance.call(to); //запрашиваем баланс ПОСЛЕ чеканки
msg="Проверка";
    setStatus(msg);
    setStatusPos(pos,msg);
    totalSup();
  //  console.log(check);
  }).then(

    function(cheked){

  //если новый баланс - старый баланс = значению эмиссии, то эмиссия прошла успешно
      if(cheked-cb==val||val==0) {
      msg="Эмиссия прошла успешно";
      setStatus(msg);
      setStatusPos(pos,msg);
      console.log('cb');
      console.log(cb);
    //  console.log(check);
    console.log('cheked');
      console.log(cheked);
    } else {
      msg="Что-то пошло не так";
      setStatus(msg);
      setStatusPos(pos,msg);
      console.log('cb');
      console.log(cb);
    //  console.log(check);
    console.log('cheked');
      console.log(cheked);
    }
  });

}


function ProcTask(cpid, out_am) {
//  console.log('func okay');
    $.post(
    "/prtask.php",
    {
    id: cpid,
//    wallet: val,
    amount: out_am
    },
    onPrSuccess
    );



 function onChSuccess (data) {
 //	console.log(data);
  var obj = data;
  console.log(obj);
  console.log(obj.wallet);
  if (obj.amount>=out_am){
    PrTask(obj.wallet,out_am);
  }
//  obj.amount=web3.toWei(obj.amount);
//  rewardMember(obj.wallet, obj.amount);
 }

 function onPrSuccess (data) {
 	console.log(data);
var msg=console.log(data);
setStatusPos("#TaskResult",msg);
  }
//  obj.amount=web3.toWei(obj.amount);
//  rewardMember(obj.wallet, obj.amount);
// setStatusPos("#TaskResult","Complete!");

}

function ProcAll() {
  var pos='#AllResult';
  var msg='Initializes';
  setStatusPos(pos, msg);

  $.post(
     "/get_id.php",
     onIdSuccess
     );
     function onIdSuccess (data) {
       msg='Connected with databese,asking quantity of transactions for output';
       setStatusPos(pos,msg);

    //   msgResult=data;
       console.log(data);
       var ids=data;
       for (var el, i=1; i<= ids; i++) {
         el=i;
         console.log(el);
         $.post(
         "/get_singleTask.php",
         {
         id: el
         },
         onSingleSuccess
         );


       }
       }
        function onSingleSuccess (data) {
        //	console.log(data);
        msg='Got Single record of task to outgoing transaction,checking..';
        setStatusPos(pos, msg);
         var obj = data;
         console.log(obj);
         console.log(obj.wallet);
         if(obj.err!=0){
           console.log(obj.err);

         } else{
      //   obj.amount=web3.toWei(obj.amount);
      msg='Sending Transaction...';
      setStatusPos(pos, msg);
         sendCoin(obj.wallet, obj.amount);
         msg='Transaction Sent..';
         setStatusPos(pos, msg);
         $.post(
         "/insertBal.php",
         {
         wallet: obj.wallet,
     //    wallet: val,
         amount: obj.amount
         },
         onInsertSuccess
         );
         function onInsertSuccess(data) {

           console.log(data);
           msg='balance renewed';
           setStatusPos(pos,msg);
           ProcTask(obj.cpid,0);
           msg='Amount of current task set to zero';
           setStatusPos(pos, msg);
           }
       }
        }
        msg='All Transaction are procceed';
    setStatusPos(pos, msg);

}

  // OLD SENDCOIN
//  var amount = parseInt(document.getElementById("amount").value);
//  var receiver = document.getElementById("receiver").value;

//  setStatus("Initiating transaction... (please wait)");

//  meta.sendCoin(receiver, amount, {from: account}).then(function() {
//    setStatus("Transaction complete!");
//    refreshBalance();
//  }).catch(function(e) {
//    console.log(e);
//    setStatus("Error sending coin; see log.");
//  });
// };



// function refreshBalance() {
//  var meta = MetaCoin.deployed();

//  meta.getBalance.call(account, {from: account}).then(function(value) {
//    var balance_element = document.getElementById("balance");
//    balance_element.innerHTML = value.valueOf();
//  }).catch(function(e) {
//    console.log(e);
//    setStatus("Error getting balance; see log.");
//  });
//  };

// function sendCoin() {
//  var meta = MetaCoin.deployed();

//  var amount = parseInt(document.getElementById("amount").value);
//  var receiver = document.getElementById("receiver").value;

//  setStatus("Initiating transaction... (please wait)");

//  meta.sendCoin(receiver, amount, {from: account}).then(function() {
//    setStatus("Transaction complete!");
//    refreshBalance();
//  }).catch(function(e) {
//    console.log(e);
//    setStatus("Error sending coin; see log.");
//  });
// };



// $("#transfer_to").val(accounts[1]);
