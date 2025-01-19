

const SectionTitles = ({heading, subHeading}) => {
    return (
        <div>
            <h1 className="text-center text-3xl font-bold text-secondary">{heading}</h1>
            <p className="text-center text-lg font-semibold text-primary">{subHeading}</p>
        </div>
    );
};

export default SectionTitles;