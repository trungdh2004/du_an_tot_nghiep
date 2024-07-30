export const customStyles = {
    control: (provided:any) => ({
        ...provided,
        width: "100%", // Làm cho control phủ toàn bộ chiều rộng
    }),
    dropdownIndicator: () => ({
        display: "none", // Ẩn con trỏ xuống
    }),
    indicatorSeparator: () => ({
        display: "none", // Ẩn đường ngăn cách
    }),
};