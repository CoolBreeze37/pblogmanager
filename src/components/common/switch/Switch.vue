<template>
  <div class="box"
       style="">
    <input id="checkbox"
           type="checkbox" />
    <label for="checkbox">
      <span></span>
    </label>
    <div class="background"></div>
  </div>
</template>

<script>
export default {

}
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.box {
  display: flex;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #c2e9f6;
  z-index: -1;
  transition: all 0.25s ease-in;
}
input {
  display: none;
}
label {
  position: fixed;
  right: -25px;
  width: 50px;
  top: 10vh;
  height: 25px;
  z-index: 100;
  border: 1px solid #72cce3;
  border-radius: 100px;
  background: #96dcee;
  transition: all 0.35s ease-in;
  cursor: pointer;
}
label:hover {
  right: 0px;
}
label::before {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  top: 2.5px;
  border: 3px solid #f5eb71;
  background-color: #fffaa8;
  animation: switch-reverse 0.35s forwards;
}
label::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  top: 8px;
  left: 30px;
  border-radius: 50%;
  box-shadow: 11px 0 0 2px #e8e8ea, 5px 8px 0 -1px #e8e8ea;
  transition: all 0.25s ease-in;
  opacity: 0;
}
label span {
  position: relative;
  top: 10px;
  left: 30px;
  display: block;
  border-radius: 5px;
  height: 5px;
  width: 5px;
  background-color: #fff;
  transition: all 0.15s ease-in;
}
label span::before,
label span::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 3px;
  border-radius: 3px;
  background-color: #fff;
  transition: all 0.15s ease-in;
}
label span::before {
  top: -3px;
  left: -5px;
}
label span::after {
  top: 5px;
  left: -1px;
}
input:checked ~ .background {
  background-color: #808fc7;
}
input:checked + label {
  border-color: #5d6baa;
  background-color: #6b7abb;
}
input:checked + label::before {
  border-color: #e8e8ea;
  background-color: #fff;
  animation: switch 0.35s forwards;
}
input:checked + label::after {
  opacity: 1;
  transition-delay: 0.25s;
}
input:checked + label span {
  width: 4px;
  left: 10px;
}
input:checked + label span::before {
  width: 2px;
  top: -5px;
}
input:checked + label span::after {
  width: 3px;
  top: 10px;
}

@keyframes switch {
  0% {
    left: 0px;
  }
  60% {
    left: 10px;
    width: 20px;
  }
  100% {
    left: 30px;
  }
}
@keyframes switch-reverse {
  0% {
    left: 30px;
  }
  60% {
    left: 10px;
    width: 20px;
  }
  100% {
    left: 0px;
  }
}
</style>