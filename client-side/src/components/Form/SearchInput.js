import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  
  const location = useLocation();
  const currentURL = location.pathname;

  const segments = currentURL.split("/");

  let foodPointName = "";
  for (let i = 0; i < segments.length; i++) {
    if (segments[i] !== "") {
      foodPointName = segments[i];
      break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/${foodPointName}/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate(`/${foodPointName}/search`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control input-sm"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button class="btn btn-dark my-2 mb" type="submit">
          &#x1F50E;&#xFE0E;
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
