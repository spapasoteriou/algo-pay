import React, { Component } from 'react'
import './App.css';


import {
  Pipeline,
  AlgoButton,
  AlgoSendButton,
  Button,
  Card,
  Modal,
  Box,
  Heading,
  Text,
  Flex,
  Flash,
} from 'pipeline-ui'


var indexerURL = "https://algoexplorerapi.io/idx2/v2/accounts/";
const myAlgoWallet = Pipeline.init();
const messageTwo = "Please sign & send transaction";
const headingTwo = "Complete Transfer";

if (window.details !== undefined) {
  var index = parseInt(window.details.index);
  var amount = window.details.amount;
  var note = window.details.note;
  var recipient = window.details.recipient;
}
else {
  var index = 0;
  var amount = 0;
  var note = "";
  var recipient = "PAPA23PAWOROGLHBAL3DNHEFI76JNIET4N32OOJLJGQRKR4PMD4EE5M7PQ"; // Default address is set to HDL seed address. Please update recipient to your address before deploying.// 
}
class AlgoPay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      update: false,
      asaIndVis: "none",
      myTransactions: ["1"],
      tableVis: false,
      balance: "",
      asaNumbVis: "none",
      asa: "Algorand",
      asaNumb: 0,
      txID: "",
      amount: 1,
      note: "",
      recipient: "",
      con_status_text: "Status: Not Connected",
      address: "",
      isOpen: false,
      completed: false,
      shhh: true,
      messagio: 'Are you sure you want to connect to MyAlgo?',
      messagioHeadagio: 'Confirm Action',
      stateZeros: 1000000,
      stateAmount: 0,
      assetName: "Algo",
      hide: false,
      timer: 5,
      loading: true
    };
  }
  
  inputstateAmount = (event) => {
    this.setState({stateAmount: event.target.value});
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.address !== this.state.address) {
      this.setState({ con_status_text: "Connected" });
      this.setState({ tableVis: true });
      this.updateBalance();
      this.getZeros();
    }
  }

  tick() {
    setInterval(
      () => {
        if (this.state.timer !== 0) {
          let time = this.state.timer;
          this.setState({ timer: time - 1 });
        }
        else {
          this.setState({ loading: false })
        }
      },
      1000)
  }

  updateBalance = () => {
    let url2 = indexerURL + this.state.address;
    fetch(url2)
      .then((response) => response.json())
      .then(data => {
        let myBalance = ". Balance: " + JSON.stringify(data.account.amount / 1000000) + " Algos";
        this.setState({ balance: myBalance });
      }).catch(function () {
        alert("Error occured  " + url2);
      });
  }


  getZeros = () => {
    if (index !== 0) {
      let url2 = "https://algoexplorerapi.io/idx2/v2/assets/" + index;
      console.log(url2)
      fetch(url2)
        .then((response) => response.json())
        .then(data => {
          console.log(data)
          let zeros = data.asset.params.decimals;
          let value = "1";
          for (var i = 0; i < zeros; i++) { value = value + "0" }
          this.setState({ stateAmount: amount / parseInt(value) })
          this.setState({ assetName: data.asset.params["unit-name"] })
        }).catch(function () {
          alert("Error occured  " + url2);
        });
    }
    else {
      this.setState({ stateAmount: amount / 1000000 });
    }
  }
  componentDidMount() {
    this.setState({ stateAmount: amount })
    this.interval = setInterval(() => {
      if (this.state.txID != "") { this.setState({ completed: true }) }
      if (this.state.address != "") { this.setState({ shhh: false, messagio: messageTwo, messagioHeadagio: headingTwo }) }
    }, 1000);
  }
  close = () => { this.setState({ isOpen: false }) }

  render() {
    return <div align="center">
      <Button color="black" className="algopay" onClick={() => this.setState({ isOpen: true })}><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.41273 18.69566" height="30" width="130"><path d="M454.935,105.62223H450.445l1.98,3.86383h2.85756a2.64657,2.64657,0,0,1,.00229,5.29314h-.14737l1.751,3.417a6.34572,6.34572,0,0,0,1.482-.68746,6.43581,6.43581,0,0,0,2.99912-5.44508h0a6.44119,6.44119,0,0,0-6.43433-6.44118Z" transform="translate(-435.49488 -104.72306)" fill="#5e5eeb"></path><path d="M457.58233,122.14135l-1.88719-3.68284-1.88553-3.67951-2.71247-5.29293-1.98-3.86384h0a1.65221,1.65221,0,0,0-1.47081-.89917h-2.11883a1.65288,1.65288,0,0,0-1.471.899l-8.46515,16.51932a.87726.87726,0,0,0,.78065,1.27736h3.02942l6.08749-11.87919a1.23367,1.23367,0,0,1,2.19584,0l1.66011,3.23948,1.88449,3.67744,2.54289,4.96228h3.02943a.87715.87715,0,0,0,.78065-1.27716Z" transform="translate(-435.49488 -104.72306)" fill="#1c1ce1"></path><path d="M451.22957,118.45664l-1.88449-3.67744h-1.43449l1.834,3.65793Z" transform="translate(-435.49488 -104.72306)" fill="#14149e"></path><path d="M447.91038,114.779h-1.94344l-.01017-.00768-4.38794,8.6474h4.33564l2.531-4.9876h.86618l.44294.00582Z" transform="translate(-435.49488 -104.72306)" fill="#5e5eeb"></path><path d="M464.88514,119.33436a.88193.88193,0,0,1,.12855-.41433l4.90014-9.81492a.34433.34433,0,0,1,.20019-.20018.94971.94971,0,0,1,.30009-.043h2.48571a.25278.25278,0,0,1,.25014.12856,1.06625,1.06625,0,0,1,.09295.28577l2.1,9.81491a.49668.49668,0,0,1-.007.25015.17509.17509,0,0,1-.19285.12123H472.686q-.20031,0-.25714-.28544l-.38569-1.82888q-.01446-.12838-.17154-.12856h-3.22879a.26531.26531,0,0,0-.24279.17154l-.97157,1.94314a.2674.2674,0,0,1-.09294.09992.48644.48644,0,0,1-.2072.02865h-2.086a.13654.13654,0,0,1-.15578-.11413l-.00147-.01443Zm6.62883-4.286q.22838,0,.15725-.27145l-.61458-2.81444c-.00965-.09493-.03829-.14281-.0856-.14281s-.09525.043-.1428.12889l-1.41454,2.88572a.26729.26729,0,0,0-.02131.17154c.0143.02866.05936.043.1359.043h1.98578Zm6.77163-6.18646h2.47171q.21435,0,.15725.35706l-1.11446,7.9151q-.043.2283.14279.22848h4.4718q.22837,0,.20019.32872l-.21449,1.5571c-.00935.09528-.03565.15488-.07825.17854a.49353.49353,0,0,1-.22145.03564h-7.14335q-.35722,0-.3141-.4l1.40025-9.94349q.04246-.25731.24279-.25713ZM487.115,119.0482a3.73356,3.73356,0,0,1-1.47145-1.5641,5.13554,5.13554,0,0,1-.51463-2.3648,7.32458,7.32458,0,0,1,.41434-2.48572,6.39094,6.39094,0,0,1,1.17875-2.043,5.36261,5.36261,0,0,1,1.82854-1.37891,5.52264,5.52264,0,0,1,2.35018-.49263,4.55463,4.55463,0,0,1,2.15022.47129,3.58487,3.58487,0,0,1,1.37126,1.20739,3.08556,3.08556,0,0,1,.52124,1.53577q-.00007.31426-.12855.32841l-2.25722.31409c-.038.00963-.0713-.01432-.0999-.07127a1.37794,1.37794,0,0,1-.086-.32875,2.6495,2.6495,0,0,0-.24279-.72142,1.36692,1.36692,0,0,0-.50028-.54291,1.58566,1.58566,0,0,0-.857-.20716,1.81349,1.81349,0,0,0-1.25.45029,3.30085,3.30085,0,0,0-.82172,1.1714,6.49165,6.49165,0,0,0-.45,1.56444,10.388,10.388,0,0,0-.13589,1.65736,2.35364,2.35364,0,0,0,.42168,1.6144,1.53142,1.53142,0,0,0,1.16441.443,2.08349,2.08349,0,0,0,.71443-.11423,2.32318,2.32318,0,0,0,.56423-.29311,2.09777,2.09777,0,0,0,.44264-.42833,3.56385,3.56385,0,0,0,.33608-.52151l.0856-.25675c.0666-.12356.01925-.18585-.14279-.18585H490.143q-.15683,0-.14279-.21449l.15724-1.34294q.014-.17137.15724-.17155l4.229.02865a.3966.3966,0,0,1,.2498.05c.03369.03331.0403.10692.0213.22117l-.68577,4.90046a.21194.21194,0,0,1-.23423.187l-.00857-.00114h-.47128a.33926.33926,0,0,1-.32874-.22883l-.34274-.94293a.11877.11877,0,0,0-.12125-.07825.3057.3057,0,0,0-.17855.12122,4.295,4.295,0,0,1-.65747.57855,3.6746,3.6746,0,0,1-.97822.49262,4.29684,4.29684,0,0,1-1.39325.20018,4.49648,4.49648,0,0,1-2.29983-.55722Zm10.88609.02165a3.65069,3.65069,0,0,1-1.51445-1.53578,5.00743,5.00743,0,0,1-.52858-2.37146l.01435-.5429a5.22152,5.22152,0,0,1,.05729-.55723,7.07006,7.07006,0,0,1,1.01412-2.85043,5.36783,5.36783,0,0,1,1.97178-1.84287,5.543,5.543,0,0,1,2.68557-.64988,4.771,4.771,0,0,1,2.35746.54989,3.72047,3.72047,0,0,1,1.51416,1.56442,5.16044,5.16044,0,0,1,.52892,2.41443l-.01434.52125-.0573.56421a6.87424,6.87424,0,0,1-1.00021,2.80746,5.285,5.285,0,0,1-1.95709,1.82856,5.59575,5.59575,0,0,1-2.68586.63545,4.9346,4.9346,0,0,1-2.38577-.53559Zm4.1647-2.29319a5.93967,5.93967,0,0,0,.87863-2.68555l.07864-.76441.0213-.64988a2.4958,2.4958,0,0,0-.35738-1.50714,1.35121,1.35121,0,0,0-1.14277-.46463,2.02115,2.02115,0,0,0-1.72164.87165,6.35113,6.35113,0,0,0-.90726,2.78546l-.07865.73608-.0213.62118a2.24149,2.24149,0,0,0,.37134,1.44285,1.44549,1.44549,0,0,0,1.17175.443,2.01717,2.01717,0,0,0,1.7073-.82855Z" transform="translate(-435.49488 -104.72306)" fill="#1c1ce1"></path><path d="M510.35892,115.54834a.23017.23017,0,0,0-.17884.05728.31444.31444,0,0,0-.06395.17154l-.48593,3.386a.351.351,0,0,1-.1069.24981.59418.59418,0,0,1-.29279.04995h-2.24288q-.30029,0-.22884-.4l1.41421-9.9718a.47816.47816,0,0,1,.0643-.18587c.02365-.02864.07864-.043.16419-.043h4.5147a5.41837,5.41837,0,0,1,1.93578.3284,3.081,3.081,0,0,1,1.37895.99288,2.637,2.637,0,0,1,.51424,1.66436,3.41039,3.41039,0,0,1-.57153,1.98576,3.67873,3.67873,0,0,1-1.54981,1.27133,5.34038,5.34038,0,0,1-2.22157.443h-2.04308Zm3.1072-4.40719a1.55347,1.55347,0,0,0-.90727-.23589h-1.50014a.27213.27213,0,0,0-.22145.07863.49921.49921,0,0,0-.09294.22144l-.28545,2.07136c-.00965.09525-.00264.1552.0213.17853a.19573.19573,0,0,0,.13555.03563h1.55749a1.5649,1.5649,0,0,0,.85-.22882,1.64222,1.64222,0,0,0,.57158-.59985,1.61891,1.61891,0,0,0,.20719-.80005.82273.82273,0,0,0-.33574-.72141Zm1.4502,8.1932a.882.882,0,0,1,.12855-.41434l4.90048-9.81492a.34432.34432,0,0,1,.20019-.20017.94829.94829,0,0,1,.29974-.043h2.486a.25224.25224,0,0,1,.24979.12856,1.06613,1.06613,0,0,1,.09295.28577l2.1,9.81491a.49612.49612,0,0,1-.007.25015.1755.1755,0,0,1-.19285.12123h-2.45741q-.20031,0-.25714-.28544l-.38569-1.82888q-.014-.12838-.17154-.12856h-3.22845a.26528.26528,0,0,0-.24279.17154l-.97157,1.94313a.2722.2722,0,0,1-.0926.09993.48545.48545,0,0,1-.20719.02864h-2.086a.1367.1367,0,0,1-.15582-.11445l-.00142-.0141Zm6.62883-4.286q.2283,0,.15724-.27145l-.61418-2.81445c-.00965-.09492-.03829-.1428-.08594-.1428s-.09525.04295-.1428.12888l-1.41455,2.88572a.26853.26853,0,0,0-.021.17155c.01434.02866.05925.043.13554.043h1.98574Zm14.351-6.07886a.22162.22162,0,0,1-.03565.20683l-4.17171,5.515a1.04939,1.04939,0,0,0-.15725.28543,3.19138,3.19138,0,0,0-.11424.57157l-.51424,3.61481q-.02886.19979-.11459.2498a.6844.6844,0,0,1-.31409.05h-2.2c-.1239,0-.20019-.02365-.22884-.07162a.43161.43161,0,0,1-.02865-.24282l.54289-3.88592a1.32825,1.32825,0,0,0,.01434-.32174,1.07878,1.07878,0,0,0-.0713-.24981l-2.60026-5.52884a.32066.32066,0,0,1-.043-.22883c.01924-.048.0999-.07161.24279-.07161h2.529a.33044.33044,0,0,1,.26415.09292.823.823,0,0,1,.13589.2498l1.4572,3.429c.04765.11424.10925.11424.18584,0l2.48572-3.55751a.51917.51917,0,0,1,.17854-.17854.6997.6997,0,0,1,.26444-.03563h2.086q.17137,0,.20719.10725Z" transform="translate(-435.49488 -104.72306)" fill="#5e5eeb"></path></svg>
      </Button>
      <Modal isOpen={this.state.isOpen} >
        <Flex className="algoflex" width="1">
        <Card p={0} >
          <div className="higher-header-container"><svg className="algopay-header-logo" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.41273 18.69566" height="40" width="320"><path d="M454.935,105.62223H450.445l1.98,3.86383h2.85756a2.64657,2.64657,0,0,1,.00229,5.29314h-.14737l1.751,3.417a6.34572,6.34572,0,0,0,1.482-.68746,6.43581,6.43581,0,0,0,2.99912-5.44508h0a6.44119,6.44119,0,0,0-6.43433-6.44118Z" transform="translate(-435.49488 -104.72306)" fill="#5e5eeb"></path><path d="M457.58233,122.14135l-1.88719-3.68284-1.88553-3.67951-2.71247-5.29293-1.98-3.86384h0a1.65221,1.65221,0,0,0-1.47081-.89917h-2.11883a1.65288,1.65288,0,0,0-1.471.899l-8.46515,16.51932a.87726.87726,0,0,0,.78065,1.27736h3.02942l6.08749-11.87919a1.23367,1.23367,0,0,1,2.19584,0l1.66011,3.23948,1.88449,3.67744,2.54289,4.96228h3.02943a.87715.87715,0,0,0,.78065-1.27716Z" transform="translate(-435.49488 -104.72306)" fill="#1c1ce1"></path><path d="M451.22957,118.45664l-1.88449-3.67744h-1.43449l1.834,3.65793Z" transform="translate(-435.49488 -104.72306)" fill="#14149e"></path><path d="M447.91038,114.779h-1.94344l-.01017-.00768-4.38794,8.6474h4.33564l2.531-4.9876h.86618l.44294.00582Z" transform="translate(-435.49488 -104.72306)" fill="#5e5eeb"></path><path d="M464.88514,119.33436a.88193.88193,0,0,1,.12855-.41433l4.90014-9.81492a.34433.34433,0,0,1,.20019-.20018.94971.94971,0,0,1,.30009-.043h2.48571a.25278.25278,0,0,1,.25014.12856,1.06625,1.06625,0,0,1,.09295.28577l2.1,9.81491a.49668.49668,0,0,1-.007.25015.17509.17509,0,0,1-.19285.12123H472.686q-.20031,0-.25714-.28544l-.38569-1.82888q-.01446-.12838-.17154-.12856h-3.22879a.26531.26531,0,0,0-.24279.17154l-.97157,1.94314a.2674.2674,0,0,1-.09294.09992.48644.48644,0,0,1-.2072.02865h-2.086a.13654.13654,0,0,1-.15578-.11413l-.00147-.01443Zm6.62883-4.286q.22838,0,.15725-.27145l-.61458-2.81444c-.00965-.09493-.03829-.14281-.0856-.14281s-.09525.043-.1428.12889l-1.41454,2.88572a.26729.26729,0,0,0-.02131.17154c.0143.02866.05936.043.1359.043h1.98578Zm6.77163-6.18646h2.47171q.21435,0,.15725.35706l-1.11446,7.9151q-.043.2283.14279.22848h4.4718q.22837,0,.20019.32872l-.21449,1.5571c-.00935.09528-.03565.15488-.07825.17854a.49353.49353,0,0,1-.22145.03564h-7.14335q-.35722,0-.3141-.4l1.40025-9.94349q.04246-.25731.24279-.25713ZM487.115,119.0482a3.73356,3.73356,0,0,1-1.47145-1.5641,5.13554,5.13554,0,0,1-.51463-2.3648,7.32458,7.32458,0,0,1,.41434-2.48572,6.39094,6.39094,0,0,1,1.17875-2.043,5.36261,5.36261,0,0,1,1.82854-1.37891,5.52264,5.52264,0,0,1,2.35018-.49263,4.55463,4.55463,0,0,1,2.15022.47129,3.58487,3.58487,0,0,1,1.37126,1.20739,3.08556,3.08556,0,0,1,.52124,1.53577q-.00007.31426-.12855.32841l-2.25722.31409c-.038.00963-.0713-.01432-.0999-.07127a1.37794,1.37794,0,0,1-.086-.32875,2.6495,2.6495,0,0,0-.24279-.72142,1.36692,1.36692,0,0,0-.50028-.54291,1.58566,1.58566,0,0,0-.857-.20716,1.81349,1.81349,0,0,0-1.25.45029,3.30085,3.30085,0,0,0-.82172,1.1714,6.49165,6.49165,0,0,0-.45,1.56444,10.388,10.388,0,0,0-.13589,1.65736,2.35364,2.35364,0,0,0,.42168,1.6144,1.53142,1.53142,0,0,0,1.16441.443,2.08349,2.08349,0,0,0,.71443-.11423,2.32318,2.32318,0,0,0,.56423-.29311,2.09777,2.09777,0,0,0,.44264-.42833,3.56385,3.56385,0,0,0,.33608-.52151l.0856-.25675c.0666-.12356.01925-.18585-.14279-.18585H490.143q-.15683,0-.14279-.21449l.15724-1.34294q.014-.17137.15724-.17155l4.229.02865a.3966.3966,0,0,1,.2498.05c.03369.03331.0403.10692.0213.22117l-.68577,4.90046a.21194.21194,0,0,1-.23423.187l-.00857-.00114h-.47128a.33926.33926,0,0,1-.32874-.22883l-.34274-.94293a.11877.11877,0,0,0-.12125-.07825.3057.3057,0,0,0-.17855.12122,4.295,4.295,0,0,1-.65747.57855,3.6746,3.6746,0,0,1-.97822.49262,4.29684,4.29684,0,0,1-1.39325.20018,4.49648,4.49648,0,0,1-2.29983-.55722Zm10.88609.02165a3.65069,3.65069,0,0,1-1.51445-1.53578,5.00743,5.00743,0,0,1-.52858-2.37146l.01435-.5429a5.22152,5.22152,0,0,1,.05729-.55723,7.07006,7.07006,0,0,1,1.01412-2.85043,5.36783,5.36783,0,0,1,1.97178-1.84287,5.543,5.543,0,0,1,2.68557-.64988,4.771,4.771,0,0,1,2.35746.54989,3.72047,3.72047,0,0,1,1.51416,1.56442,5.16044,5.16044,0,0,1,.52892,2.41443l-.01434.52125-.0573.56421a6.87424,6.87424,0,0,1-1.00021,2.80746,5.285,5.285,0,0,1-1.95709,1.82856,5.59575,5.59575,0,0,1-2.68586.63545,4.9346,4.9346,0,0,1-2.38577-.53559Zm4.1647-2.29319a5.93967,5.93967,0,0,0,.87863-2.68555l.07864-.76441.0213-.64988a2.4958,2.4958,0,0,0-.35738-1.50714,1.35121,1.35121,0,0,0-1.14277-.46463,2.02115,2.02115,0,0,0-1.72164.87165,6.35113,6.35113,0,0,0-.90726,2.78546l-.07865.73608-.0213.62118a2.24149,2.24149,0,0,0,.37134,1.44285,1.44549,1.44549,0,0,0,1.17175.443,2.01717,2.01717,0,0,0,1.7073-.82855Z" transform="translate(-435.49488 -104.72306)" fill="#1c1ce1"></path><path d="M510.35892,115.54834a.23017.23017,0,0,0-.17884.05728.31444.31444,0,0,0-.06395.17154l-.48593,3.386a.351.351,0,0,1-.1069.24981.59418.59418,0,0,1-.29279.04995h-2.24288q-.30029,0-.22884-.4l1.41421-9.9718a.47816.47816,0,0,1,.0643-.18587c.02365-.02864.07864-.043.16419-.043h4.5147a5.41837,5.41837,0,0,1,1.93578.3284,3.081,3.081,0,0,1,1.37895.99288,2.637,2.637,0,0,1,.51424,1.66436,3.41039,3.41039,0,0,1-.57153,1.98576,3.67873,3.67873,0,0,1-1.54981,1.27133,5.34038,5.34038,0,0,1-2.22157.443h-2.04308Zm3.1072-4.40719a1.55347,1.55347,0,0,0-.90727-.23589h-1.50014a.27213.27213,0,0,0-.22145.07863.49921.49921,0,0,0-.09294.22144l-.28545,2.07136c-.00965.09525-.00264.1552.0213.17853a.19573.19573,0,0,0,.13555.03563h1.55749a1.5649,1.5649,0,0,0,.85-.22882,1.64222,1.64222,0,0,0,.57158-.59985,1.61891,1.61891,0,0,0,.20719-.80005.82273.82273,0,0,0-.33574-.72141Zm1.4502,8.1932a.882.882,0,0,1,.12855-.41434l4.90048-9.81492a.34432.34432,0,0,1,.20019-.20017.94829.94829,0,0,1,.29974-.043h2.486a.25224.25224,0,0,1,.24979.12856,1.06613,1.06613,0,0,1,.09295.28577l2.1,9.81491a.49612.49612,0,0,1-.007.25015.1755.1755,0,0,1-.19285.12123h-2.45741q-.20031,0-.25714-.28544l-.38569-1.82888q-.014-.12838-.17154-.12856h-3.22845a.26528.26528,0,0,0-.24279.17154l-.97157,1.94313a.2722.2722,0,0,1-.0926.09993.48545.48545,0,0,1-.20719.02864h-2.086a.1367.1367,0,0,1-.15582-.11445l-.00142-.0141Zm6.62883-4.286q.2283,0,.15724-.27145l-.61418-2.81445c-.00965-.09492-.03829-.1428-.08594-.1428s-.09525.04295-.1428.12888l-1.41455,2.88572a.26853.26853,0,0,0-.021.17155c.01434.02866.05925.043.13554.043h1.98574Zm14.351-6.07886a.22162.22162,0,0,1-.03565.20683l-4.17171,5.515a1.04939,1.04939,0,0,0-.15725.28543,3.19138,3.19138,0,0,0-.11424.57157l-.51424,3.61481q-.02886.19979-.11459.2498a.6844.6844,0,0,1-.31409.05h-2.2c-.1239,0-.20019-.02365-.22884-.07162a.43161.43161,0,0,1-.02865-.24282l.54289-3.88592a1.32825,1.32825,0,0,0,.01434-.32174,1.07878,1.07878,0,0,0-.0713-.24981l-2.60026-5.52884a.32066.32066,0,0,1-.043-.22883c.01924-.048.0999-.07161.24279-.07161h2.529a.33044.33044,0,0,1,.26415.09292.823.823,0,0,1,.13589.2498l1.4572,3.429c.04765.11424.10925.11424.18584,0l2.48572-3.55751a.51917.51917,0,0,1,.17854-.17854.6997.6997,0,0,1,.26444-.03563h2.086q.17137,0,.20719.10725Z" transform="translate(-435.49488 -104.72306)" fill="#5e5eeb"></path></svg></div>
          <Button.Text className="modal-close"
            icononly
            icon={"Close"}
            color={"moon-gray"}
            position={"absolute"}
            top={0}
            left={0}
            mt={0}
            mr={3}
            onClick={this.close}
          />

          <Box p={4} pb={1} mb={3}>
            <Heading.h3>{this.state.messagioHeadagio}</Heading.h3>
            <Text>{this.state.messagio}</Text>
            {this.state.tableVis ? (<div><h3 id="snoopy">{"My Address: " + this.state.address.slice(0, 20) + '...'}</h3>
              <h3 id="snoopy">{"Amount: " <input type="number" onChange=(this.inputstateAmount) />  + " " + this.state.assetName}</h3></div>) : null}
          </Box>

          <Flex className="flexy"
            px={1}
            py={3}
            borderTop={1}
            borderColor={"#E8E8E8"}
            justifyContent={"center"}
          >
            <div className="algo-flex" align="center">
              {this.state.shhh ? (<div>
                <AlgoButton wallet={myAlgoWallet} context={this} returnTo={"address"} />
              </div>) : null}

              {this.state.tableVis ? <div > <Flex className="algoflex2">
                <AlgoSendButton p={4} pb={1} mb={3}
                  index={index}
                  recipient={recipient}
                  amount={this.state.amount*1000000}
                  note={note}
                  myAddress={this.state.address}
                  wallet={myAlgoWallet}
                  context={this}
                  returnTo={"txID"}
                /></Flex><br></br>
              </div>
                : null}
              {this.state.completed ? !this.state.hide ? <Flex className="algoflex3"><Flash className="le-flash" my={3} variant="info">
                {this.tick()}
                <Button.Text className="modal-close-2"
                  icononly
                  icon={"Close"}
                  color={"#3f3d4b"}
                  position={"absolute"}
                  top={0}
                  right={0}
                  mt={1}
                  mr={1}
                  onClick={() =>
                    this.setState({ hide: true })
                  }
                />
                <Flex className="flassh"><Text className="text-progress">Check progress on </Text><Flash.Link className="algoexplorer" href={"https://algoexplorer.io/tx/" + this.state.txID}> AlgoExplorer</Flash.Link></Flex>
              </Flash></Flex > : null : null}

            </div>
          </Flex>
          <div className="footer primary"><div>2021 HEADLINE INC.</div><div>Powered by <a className="footer-link" href="https://www.pipeline-ui.com" target="_blank" rel="noopener noreferrer">PIPELINE-UI</a> &nbsp;<a className="footer-link" href="mailto:contact@headline-inc.com" target="_blank" rel="noopener noreferrer">Contact</a></div></div>
        </Card>
        </Flex>
      </Modal>
    </div>
  }
}

export default AlgoPay;
