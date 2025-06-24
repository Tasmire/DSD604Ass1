export const selectCustomStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: "1px solid grey",
        color: state.isSelected ? "white" : "white",
        backgroundColor: state.isSelected ? "green" : "#333",
        padding: "0px",
    }),
    control: (provided, state) => ({
        ...provided,
        backgroundColor: state.isDisabled ? "#0a270b" : provided.backgroundColor,
        borderColor: state.isDisabled ? "#4caf50" : provided.borderColor,
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? "#aaa" : "#fff",
    }),
};