import React, { useState } from "react";
import "./App.css";

import greenDollarSign from "./images/icon-dollar-green.svg";
import dollarSign from "./images/icon-dollar.svg";
import person from "./images/icon-person.svg";

const billInput = document.getElementById("bill") as HTMLInputElement;
const customTipInput = document.getElementById(
  "custom-tip"
) as HTMLInputElement;
const numberOfPeopleInput = document.getElementById(
  "number-of-people"
) as HTMLInputElement;

function App() {
  const [bill, setBill] = useState<string | number | undefined>(undefined);
  const [currentTip, setCurrentTip] = useState(0.0);
  const [numberOfPeople, setnumberOfPeople] = useState<
    string | number | undefined
  >(undefined);
  const tipPercent = [5, 10, 15, 25, 50];

  function calculateTipAmountPerPerson(
    bill: number,
    tipPercent: number,
    numberOfPeople: number
  ) {
    return (bill * tipPercent) / numberOfPeople;
  }

  function calculateTotalPerPerson(
    tipAmountPerPerson: number,
    bill: number,
    numberOfPeople: number
  ): number {
    return bill / numberOfPeople + tipAmountPerPerson;
  }

  return (
    <main className="container">
      <h1>
        <p>SPLI</p>
        <p>TTER</p>
      </h1>

      <section className="app">
        <section className="app__inputs">
          <section className="app__inputs_bill">
            <div>
              <label htmlFor="bill">Bill</label>

              {Number(bill) === 0 && <p>Can't be zero</p>}

              {isNaN(bill as number) && bill !== undefined && (
                <p>Please enter a number</p>
              )}
            </div>

            <div>
              <img src={dollarSign} alt="gray dollar sign" />

              <input
                type="text"
                name="bill"
                id="bill"
                placeholder="0"
                onChange={(e) => setBill(e.target.value)}
                style={{
                  border:
                    bill === 0 || (isNaN(bill as number) && bill !== undefined)
                      ? "2px solid var(--error-clr)"
                      : "",
                }}
                value={bill || ""}
              />
            </div>
          </section>

          <section className="app__inputs_tip">
            <label htmlFor="custom-tip">Select tip %</label>

            <div>
              {tipPercent.map((tip) => (
                <button
                  onClick={() => setCurrentTip(tip / 100)}
                  key={tip}
                  style={{
                    backgroundColor:
                      currentTip === tip / 100 ? "#26c2ad" : "var(--output-bg)",
                    color:
                      currentTip === tip / 100
                        ? "var(--output-bg)"
                        : "var(--app-bg)",
                  }}
                >
                  {tip}%
                </button>
              ))}
              <input
                type="number"
                name="custom-tip"
                id="custom-tip"
                placeholder="Custom"
                onChange={(e) => setCurrentTip(Number(e.target.value) / 100)}
              />
            </div>
          </section>

          <section className="app__inputs_bill">
            <div>
              <label htmlFor="number-of-people">Number of People</label>

              {Number(numberOfPeople) === 0 && <p>Can't be zero</p>}

              {isNaN(numberOfPeople as number) &&
                numberOfPeople !== undefined && <p>Please enter a number</p>}
            </div>

            <div>
              <img src={person} alt="person icon" />

              <input
                type="text"
                name="number-of-people"
                id="number-of-people"
                placeholder="0"
                onChange={(e) => setnumberOfPeople(e.target.value)}
                style={{
                  border:
                    Number(numberOfPeople) === 0 ||
                    (isNaN(numberOfPeople as number) &&
                      numberOfPeople !== undefined)
                      ? "2px solid var(--error-clr)"
                      : "",
                }}
                value={numberOfPeople || ""}
              />
            </div>
          </section>
        </section>

        <section className="app__outputs">
          <section className="app__outputs_display">
            <div>
              <div>
                <p>Tip Amount</p>
                <p>/ person</p>
              </div>

              <div>
                <img src={greenDollarSign} alt="green dollar sign" />

                <p>
                  {Number(bill) !== 0 &&
                  currentTip &&
                  Number(numberOfPeople) !== 0 &&
                  !isNaN(Number(bill)) &&
                  !isNaN(Number(numberOfPeople))
                    ? calculateTipAmountPerPerson(
                        bill as number,
                        currentTip,
                        Number(numberOfPeople)
                      ).toFixed(2)
                    : "0.00"}
                </p>
              </div>
            </div>

            <div>
              <div>
                <p>Total</p>
                <p>/ person</p>
              </div>

              <div>
                <img src={greenDollarSign} alt="green dollar sign" />

                <p>
                  {Number(bill) !== 0 &&
                  currentTip &&
                  Number(numberOfPeople) !== 0 &&
                  !isNaN(Number(bill)) &&
                  !isNaN(Number(numberOfPeople))
                    ? calculateTotalPerPerson(
                        calculateTipAmountPerPerson(
                          Number(bill),
                          currentTip,
                          Number(numberOfPeople)
                        ),
                        Number(bill),
                        Number(numberOfPeople)
                      ).toFixed(2)
                    : "0.00"}
                </p>
              </div>
            </div>
          </section>

          <button
            className="app__outputs_reset"
            onClick={() => {
              setBill(undefined);
              setCurrentTip(0);
              setnumberOfPeople(undefined);
              // billInput!.value = "";
              // customTipInput!.value = "";
              // numberOfPeopleInput!.value = "";
            }}
            disabled={
              bill !== undefined ||
              currentTip !== 0 ||
              numberOfPeople !== undefined
                ? false
                : true
            }
          >
            RESET
          </button>
        </section>
      </section>
    </main>
  );
}

export default App;
