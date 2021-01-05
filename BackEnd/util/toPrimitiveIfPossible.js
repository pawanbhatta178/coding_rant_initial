
const toPrimitiveIfPossible = (x) => {
    if (x === "true") {
        return true;
    }
    if (x === "false") {
        return false;
    }
    const ans = Number(x);
    if (isNaN(ans)) {
        return x;
    }
    return ans;
}

module.exports = toPrimitiveIfPossible;