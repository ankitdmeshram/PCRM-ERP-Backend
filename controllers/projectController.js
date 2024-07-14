exports.test = async (req, res) => {
    try {
        res.status(200).json({
            "message": "User Created Successfully!",
            "success": true,
            type: "success",
        });

    } catch (err) {
        console.log("catch err", err);
        res.status(500).json({
            success: false,
            message: "something went wrong",
            type: "error",
        });
    }
};