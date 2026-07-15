import "./App.css";
import { useState } from "react";
import api from "./services/api";

function App() {
  const [form, setForm] = useState({
    contractNo: "",
    clientName: "",
    otr: "",
    dpPercent: "",
    tenor: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/installments/calculate", {
        ...form,
        otr: Number(form.otr),
        dpPercent: Number(form.dpPercent),
        tenor: Number(form.tenor),
      });

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to calculate installment");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>IMS Finance Calculator</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Contract No</label>
            <input
              type="text"
              name="contractNo"
              value={form.contractNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Client Name</label>
            <input
              type="text"
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>OTR</label>
            <input
              type="number"
              name="otr"
              value={form.otr}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>DP (%)</label>
            <input
              type="number"
              name="dpPercent"
              value={form.dpPercent}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tenor (Month)</label>
            <input
              type="number"
              name="tenor"
              value={form.tenor}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Calculate</button>
        </form>

        {result && (
          <div className="result">
            <h2>Calculation Result</h2>

            <div className="info">
              <p>
                <strong>Contract No :</strong> {result.contractNo}
              </p>

              <p>
                <strong>Client Name :</strong> {result.clientName}
              </p>

              <p>
                <strong>OTR :</strong> Rp{" "}
                {Number(result.otr).toLocaleString("id-ID")}
              </p>

              <p>
                <strong>Down Payment :</strong> Rp{" "}
                {Number(result.downPayment).toLocaleString("id-ID")}
              </p>

              <p>
                <strong>Loan Amount :</strong> Rp{" "}
                {Number(result.loanAmount).toLocaleString("id-ID")}
              </p>

              <p>
                <strong>Monthly Installment :</strong> Rp{" "}
                {Number(result.monthlyInstallment).toLocaleString("id-ID", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>

            <h2>Installment Schedule</h2>

            <table>
              <thead>
                <tr>
                  <th>Installment No</th>
                  <th>Due Date</th>
                  <th>Monthly Installment</th>
                </tr>
              </thead>

              <tbody>
                {result.schedule.map((item) => (
                  <tr key={item.installmentNo}>
                    <td>{item.installmentNo}</td>
                    <td>{item.dueDate}</td>
                    <td>
                      Rp{" "}
                      {Number(item.monthlyInstallment).toLocaleString("id-ID", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
