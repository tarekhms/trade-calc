import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { setupIonicReact, IonModal, IonActionSheet, IonButton, IonInput, IonRadioGroup, IonRadio  } from '@ionic/react';
setupIonicReact();

function App() {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false);
  const [eq, setEq] = useState('buy');
  const [result, setResult] = useState(0);
  const [balance, setBalance] = useState(1);
  const [position, setPosition] = useState(0);
  const [assets, setAssets] = useState(0);
  const [order, setOrder] = useState("-1");

  useEffect(() => {
    setResult((position + Number(order)*(assets / balance)).toFixed(3));
    // console.log(order);
    
  }, [position, assets, balance, order]);

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
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Trade Calculator</h1>

      {eq=='buy' ?
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
      : (eq=='sell' ? 
      <p> Sell </p> 
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
                  action: 'buy',
                },
              },
              {
                text: 'New Position Price',
                data: {
                  action: 'sell',
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
