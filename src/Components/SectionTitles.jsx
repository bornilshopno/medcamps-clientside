

const SectionTitles = ({heading, subHeading}) => {
    return (
        <div>
            <h1 className="text-center text-3xl font-bold text-secondary mt-5  mb-5 lg:mt-20 dark:text-green-900">{heading}</h1>
            <p className="text-center text-lg font-semibold text-green-500 dark:text-green-900">{subHeading}</p>
        </div>
    );
};

export default SectionTitles;