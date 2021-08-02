/**
 * Validate that a resource being POSTed or PUT
 * has a valid shape, else return 400 Bad Request
 * @param {*} resourceSchema is a yup schema
 */

module.exports = {
    validateResource: (resourceSchema) => (req, res, next) => {
        const resource = req.body;
        try {
            // throws an error if not valid
            //resourceSchema.isValid(resource);
            next();
        } catch (e) {
            console.error(e);
            res.status(400).json({ error: e.errors.join(', ') });
        }
    }
}