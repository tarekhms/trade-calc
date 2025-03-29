import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { setupIonicReact, IonModal, IonActionSheet, IonButton, IonInput, IonRadioGroup, IonRadio  } from '@ionic/react';
setupIonicReact();

function App() {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false);
  const [eq, setEq] = useState('liquidation');
  const [result, setResult] = useState(0);
  const [result2, setResult2] = useState(0);
  const [balance, setBalance] = useState(0);
  const [position, setPosition] = useState(0);
  const [balance2, setBalance2] = useState(0);
  const [position2, setPosition2] = useState(0);
  const [assets, setAssets] = useState(0);
  const [order, setOrder] = useState("-1");

  useEffect(() => {
    eq == "liquidation" && setResult((position + Number(order)*(assets / balance)).toFixed(3));
    if(eq == "newposition") {
      const newposition = balance!=0 && balance2!=0 ? ((position * balance) + (position2 * balance2)) / (balance + balance2) : position;
      const assets2 = position2!=0 && balance2!=0 ? assets - (balance * ((-1 * order) * (position - position2))) : assets;
      setResult((newposition + Number(order)*(assets2 / balance)).toFixed(3));
      setResult2(newposition.toFixed(3));
      console.log(newposition, assets2, balance, balance2);
      
    }
    // console.log(order);
    
  }, [assets, position, balance, position2, balance2, order, eq]);

  const handleClick = (event) => {
    const input = event.currentTarget;

    if (input) {
      input.setFocus(); // focus the ion-input (Ionic-specific)
      
      // Then scroll the native input into view
      setTimeout(() => {
        input.getInputElement().then((nativeInput) => {
          nativeInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }, 100); // delay gives time for keyboard to appear
    }
  };

  return (
    <>
      <div>
        <img src={reactLogo} className="logo spin react" alt="React logo" />
      </div>
      <h1>Trade Calculator</h1>

      {eq=='liquidation' ?
      <p>
        Liquidation Price: {result}
        <br/>
        <br/>
      <IonRadioGroup value={order} onIonChange={e => setOrder(e.detail.value)}>
        <IonRadio value="-1" class="radiog">Long</IonRadio>
        <IonRadio value="1" class="radiog2">Short</IonRadio>
      </IonRadioGroup>
      <br/><br/>
      <IonInput label="Total Assets" labelPlacement="floating" placeholder="0" fill="outline" type="number" class="custom" onclick={handleClick} onKeyUp={(e)=> setAssets(Number(e.target.value))}></IonInput>
      <IonInput label="Position" labelPlacement="floating" placeholder="0" fill="outline" type="number" class="custom" onclick={handleClick} onKeyUp={(e)=> setPosition(Number(e.target.value))}></IonInput>
      <IonInput label="Coin Balance" labelPlacement="floating" placeholder="0" fill="outline" type="number" class="custom" onclick={handleClick} onKeyUp={(e)=> setBalance(Number(e.target.value))}></IonInput>
      </p>
      : (eq=='newposition' ? 
        <p>
        New Position: {result2}
        <br/>
        Liquidation Price: {result}
        <br/>
        <br/>
        <IonRadioGroup value={order} onIonChange={e => setOrder(e.detail.value)}>
          <IonRadio value="-1" class="radiog">Long</IonRadio>
          <IonRadio value="1" class="radiog2">Short</IonRadio>
        </IonRadioGroup>
        <br/><br/>
        <IonInput label="Total Assets" labelPlacement="floating" placeholder="0" fill="outline" type="number" class="custom" onclick={handleClick} onKeyUp={(e)=> setAssets(Number(e.target.value))}></IonInput>
        <br/>
        <IonInput label="Old Position" labelPlacement="floating" placeholder="0" fill="outline" type="number" class="custom" onclick={handleClick} onKeyUp={(e)=> setPosition(Number(e.target.value))}></IonInput>
        <IonInput label="Old Balance" labelPlacement="floating" placeholder="0" fill="outline" type="number" class="custom" onclick={handleClick} onKeyUp={(e)=> setBalance(Number(e.target.value))}></IonInput>
        <br/>
        <IonInput label="New Position" labelPlacement="floating" placeholder="0" fill="outline" type="number" class="custom" onclick={handleClick} onKeyUp={(e)=> setPosition2(Number(e.target.value))}></IonInput>
        <IonInput label="New Balance" labelPlacement="floating" placeholder="0" fill="outline" type="number" class="custom" onclick={handleClick} onKeyUp={(e)=> setBalance2(Number(e.target.value))}></IonInput>
      </p>
      : 
      <p> Cancel </p>
      )} 
      <br/><br/>
      <IonButton onClick={() => setOpen(true)}>Choose</IonButton>

      <IonActionSheet isOpen={open} breakpoints={[0,0.2,0.5]} initialBreakpoint={0.5} backdropBreakpoint={0.2}
            buttons={[
              {
                text: 'Liquidation Price',
                data: {
                  action: 'liquidation',
                },
              },
              {
                text: 'New Position Price',
                data: {
                  action: 'newposition',
                },
              },
              {
                text: 'Cancel',
                role: 'cancel',
                data: {
                  action: eq,
                },
              },
            ]}
            onDidDismiss={({ detail }) => {setEq(detail.data ? detail.data.action : 'buy'); setOpen(false)}}
      >
      </IonActionSheet>
    </>
  )
}

export default App
