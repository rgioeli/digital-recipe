import styled from "styled-components";
import { MdEmojiFoodBeverage } from "react-icons/md";
import Spacer from "../../../global-components-and-functions/components/Spacer";
import { v4 } from "uuid";

const AddIngredient = ({
  id,
  handleClick,
  setNumberOfIngredients,
  numberOfIngredients,
}) => {
  const handleAddIngredientData = (e) => {
    setNumberOfIngredients((prevState) => {
      const dupeArr = [...prevState];
      dupeArr.forEach((x) => {
        if (x.id === id) {
          x[e.target.name] = e.target.value;
        }
      });

      return dupeArr;
    });
  };
  return (
    <Wrapper>
      <div className="category">
        <label htmlFor="">Amount</label>
        <div className="amount-number-div">
          <select
            onChange={handleAddIngredientData}
            className={"amount-number"}
            name="wholeNumberMeasurement"
          >
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="3">4</option>
            <option value="1">5</option>
            <option value="2">6</option>
            <option value="3">6</option>
            <option value="3">7</option>
            <option value="1">8</option>
            <option value="2">9</option>
            <option value="3">10</option>
            <option value="3">11</option>
            <option value="1">12</option>
            <option value="2">13</option>
            <option value="3">14</option>
            <option value="3">15</option>
            <option value="3">16</option>
            <option value="3">17</option>
            <option value="1">18</option>
            <option value="2">19</option>
            <option value="3">20</option>
          </select>
          <select onChange={handleAddIngredientData} name="fractionMeasurement">
            <option value=""></option>
            <option value="1/4">1/4</option>
            <option value="1/2">1/2</option>
            <option value="3/4">3/4</option>
          </select>
        </div>
      </div>
      <Spacer direction={"left"} size={"1rem"} />
      <div className="category">
        <label htmlFor="">Measurement</label>
        <select onChange={handleAddIngredientData} name="typeOfMeasurement">
          <option value=""></option>
          <option value="ounce(s)">ounce(s)</option>
          <option value="tsp(s)">tsp(s)</option>
          <option value="tbsp(s)">tbsp(s)</option>
          <option value="pound(s)">pound(s)</option>
          <option value="cup(s)">cup(s)</option>
        </select>
      </div>
      <Spacer direction={"left"} size={"1rem"} />
      <div className="category-ingredient-name">
        <label htmlFor="">Ingredient</label>
        <input
          onChange={handleAddIngredientData}
          className="ingredient-name"
          name={"ingredientName"}
          type="text"
        />
      </div>
      <div className="category">
        <button onClick={() => handleClick(id)}>Delete</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1024px;
  margin: auto;
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
  .category {
    display: flex;
    flex-flow: column;
    align-items: center;
    .amount-number-div {
      .amount-number {
        width: 4rem;
      }
    }
    button {
      background-color: #e45e36;
      padding: 0.5rem;
      font-size: 12px;
      cursor: pointer;
      position: relative;
      top: 10px;
      margin-left: 1rem;
    }
  }
  .category-ingredient-name {
    flex: 1;
    .ingredient-name {
      width: 100%;
    }
  }
`;

export default AddIngredient;
