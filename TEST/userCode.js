/**
 * @typedef {{
    *   val: number,
    *   left: Node,
    *   right: Node,
    * }} Node
    */
   
   /**
    * @param {Node} root 
    * @return {bool} whether the tree is BST.
    */
   function validateBinarySearchTree(root) {
     return validateRecursively(root, null, null);
   }
   
   /**
    * @param {Node} root 
    * @param {Node} leftBoundNode The value of which acts as the minimum
        threshold that nodes in this branch must exceed.
    * @param {Node} rightBoundNode The value of which acts as the maximum
        threshold that nodes in this branch must not exceed.
    * @return {bool} whether the tree from root is BST and nodes
        are within bounds.
    */
   function validateRecursively(root, leftBoundNode, rightBoundNode) {
     // Handles edge case.
     if (root == null) {
       return true;
     }
   
     // The curent node's value must be within the bounds defined by
     // the left and right bound nodes.
     const isWithinBounds = (
       // Checks greater than left bound.
       (leftBoundNode == null || leftBoundNode.val < root.val) &&
       // Checks smaller than right bound.
       (rightBoundNode == null || root.val < rightBoundNode.val)
     );
     if (!isWithinBounds) {
       return false;
     }
   
     // Recursively validates its children.  The current node now
     // acts as one of the 2 bounds.
     return (
       validateRecursively(root.left, leftBoundNode, root) &&
       validateRecursively(root.right, root, rightBoundNode)
     );
   }

   module.exports=validateBinarySearchTree;