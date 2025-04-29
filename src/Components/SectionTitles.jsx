

const SectionTitles = ({heading, subHeading}) => {
    return (
        <div>
            <h1 className="text-center text-3xl font-bold text-secondary mt-5  mb-5 lg:mt-20 dark:text-white">{heading}</h1>
            <p className="text-center text-lg font-semibold text-green-500 dark:text-gray-200">{subHeading}</p>
        </div>
    );
};

export default SectionTitles;