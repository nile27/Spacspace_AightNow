export const EyeSVG = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_290_3322)">
        <path
          d="M12.5 6.5C16.29 6.5 19.67 8.63 21.32 12C19.67 15.37 16.3 17.5 12.5 17.5C8.7 17.5 5.33 15.37 3.68 12C5.33 8.63 8.71 6.5 12.5 6.5ZM12.5 4.5C7.5 4.5 3.23 7.61 1.5 12C3.23 16.39 7.5 19.5 12.5 19.5C17.5 19.5 21.77 16.39 23.5 12C21.77 7.61 17.5 4.5 12.5 4.5ZM12.5 9.5C13.88 9.5 15 10.62 15 12C15 13.38 13.88 14.5 12.5 14.5C11.12 14.5 10 13.38 10 12C10 10.62 11.12 9.5 12.5 9.5ZM12.5 7.5C10.02 7.5 8 9.52 8 12C8 14.48 10.02 16.5 12.5 16.5C14.98 16.5 17 14.48 17 12C17 9.52 14.98 7.5 12.5 7.5Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_290_3322">
          <rect width="24" height="24" fill={color} transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const EyeNotSVG = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_267_1600)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.23678 17.8238C7.15254 19.1658 9.48384 19.9534 12 19.9534C17 19.9534 21.27 16.8434 23 12.4534C21.8883 9.63244 19.7279 7.34004 16.9989 6.06171L15.4785 7.58205C17.7812 8.44819 19.6995 10.1649 20.82 12.4534C19.17 15.8234 15.8 17.9534 12 17.9534C10.0514 17.9534 8.21594 17.3933 6.66744 16.3932L5.23678 17.8238ZM8.20006 14.8605C8.99938 16.1173 10.4045 16.9534 12 16.9534C14.48 16.9534 16.5 14.9334 16.5 12.4534C16.5 10.8579 15.6639 9.45275 14.4072 8.65343L12.9288 10.1318C13.8493 10.5007 14.5 11.4015 14.5 12.4534C14.5 13.8334 13.38 14.9534 12 14.9534C10.9482 14.9534 10.0474 14.3027 9.67843 13.3822L8.20006 14.8605ZM9.52141 12.125L7.74073 13.9057C7.58471 13.4498 7.5 12.9612 7.5 12.4534C7.5 9.97337 9.52 7.95337 12 7.95337C12.5079 7.95337 12.9964 8.03808 13.4523 8.1941L11.6716 9.97478C10.5541 10.1216 9.66824 11.0075 9.52141 12.125ZM14.4002 7.24624C13.6285 7.05404 12.8239 6.95337 12 6.95337C8.21 6.95337 4.83 9.08337 3.18 12.4534C3.82892 13.7787 4.74389 14.9123 5.84642 15.8L4.43591 17.2105C2.92547 15.9484 1.73407 14.3161 1 12.4534C2.73 8.06337 7 4.95337 12 4.95337C13.4036 4.95337 14.7497 5.19846 15.9982 5.64815L14.4002 7.24624Z"
          fill={color}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.7071 3.74626C21.0976 4.13679 21.0976 4.76995 20.7071 5.16048L4.70711 21.1605C4.31658 21.551 3.68342 21.551 3.29289 21.1605C2.90237 20.77 2.90237 20.1368 3.29289 19.7463L19.2929 3.74626C19.6834 3.35574 20.3166 3.35574 20.7071 3.74626Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_267_1600">
          <rect width="24" height="24" fill={color} transform="translate(0 0.453369)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Calender = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_267_1595)">
        <path
          d="M20 3.45337H19V2.45337C19 1.90337 18.55 1.45337 18 1.45337C17.45 1.45337 17 1.90337 17 2.45337V3.45337H7V2.45337C7 1.90337 6.55 1.45337 6 1.45337C5.45 1.45337 5 1.90337 5 2.45337V3.45337H4C2.9 3.45337 2 4.35337 2 5.45337V21.4534C2 22.5534 2.9 23.4534 4 23.4534H20C21.1 23.4534 22 22.5534 22 21.4534V5.45337C22 4.35337 21.1 3.45337 20 3.45337ZM19 21.4534H5C4.45 21.4534 4 21.0034 4 20.4534V8.45337H20V20.4534C20 21.0034 19.55 21.4534 19 21.4534Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_267_1595">
          <rect width="24" height="24" fill={color} transform="translate(0 0.453369)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Edit = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_271_955)">
        <circle cx="12" cy="12" r="10" fill="color" />
        <path
          d="M6.15625 15.5378V17.5079C6.15625 17.6894 6.29882 17.832 6.48028 17.832H8.45038C8.53462 17.832 8.61887 17.7996 8.6772 17.7347L15.754 10.6644L13.3238 8.23421L6.25346 15.3045C6.18865 15.3693 6.15625 15.4471 6.15625 15.5378ZM17.6334 8.78506C17.8861 8.53232 17.8861 8.12404 17.6334 7.8713L16.1169 6.35484C15.8642 6.1021 15.4559 6.1021 15.2031 6.35484L14.0172 7.54079L16.4474 9.97101L17.6334 8.78506Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_271_955">
          <rect width="24" height="24" fill={color} transform="translate(0 0.453369)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const AI = ({ color, width, height }: { color: string; width: number; height: number }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5027 8.3053C10.6348 8.96314 9.81361 9.68054 9.04518 10.4523C5.42382 14.0739 3.59022 18.1094 4.9476 19.4682C6.30497 20.8257 10.3414 18.9907 13.9615 15.3703C14.7333 14.6014 15.4506 13.7797 16.1084 12.9113"
        stroke={color}
        stroke-width="1.6496"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.1071 12.911C18.2425 15.7457 19.1122 18.4122 18.0579 19.4666C16.6992 20.8254 12.664 18.9904 9.04266 15.37C5.42385 11.7471 3.59025 7.71289 4.94762 6.35414C6.00194 5.30101 8.6683 6.17076 11.5027 8.30503"
        stroke={color}
        stroke-width="1.6496"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.8711 12.9119C10.8711 13.0808 10.9382 13.2428 11.0576 13.3622C11.177 13.4816 11.3389 13.5487 11.5078 13.5487C11.6766 13.5487 11.8386 13.4816 11.958 13.3622C12.0774 13.2428 12.1444 13.0808 12.1444 12.9119C12.1444 12.7431 12.0774 12.5811 11.958 12.4617C11.8386 12.3423 11.6766 12.2752 11.5078 12.2752C11.3389 12.2752 11.177 12.3423 11.0576 12.4617C10.9382 12.5811 10.8711 12.7431 10.8711 12.9119ZM14.0672 7.36742C13.6661 7.29738 13.6661 6.72306 14.0672 6.6543C14.7756 6.53106 15.4312 6.19963 15.9506 5.70226C16.4699 5.2049 16.8293 4.56414 16.9831 3.86167L17.006 3.75088C17.0926 3.35612 17.6554 3.35357 17.7445 3.74706L17.7751 3.87568C17.9346 4.57503 18.2972 5.21166 18.8174 5.70557C19.3375 6.19948 19.992 6.52866 20.6987 6.65175C21.1011 6.72179 21.1011 7.29993 20.6987 7.36869C19.992 7.49178 19.3375 7.82096 18.8174 8.31488C18.2972 8.80879 17.9346 9.44541 17.7751 10.1448L17.7445 10.2734C17.6554 10.6682 17.0926 10.6656 17.006 10.2708L16.9805 10.1601C16.8268 9.45758 16.4673 8.81682 15.948 8.31946C15.4287 7.82209 14.773 7.49066 14.0646 7.36742H14.0672Z"
        stroke={color}
        stroke-width="1.6496"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const Refresh = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22.4534C9.20833 22.4534 6.84375 21.4846 4.90625 19.5471C2.96875 17.6096 2 15.245 2 12.4534C2 9.6617 2.96875 7.29712 4.90625 5.35962C6.84375 3.42212 9.20833 2.45337 12 2.45337C13.4375 2.45337 14.8125 2.75045 16.125 3.34462C17.4375 3.93795 18.5625 4.7867 19.5 5.89087V3.70337C19.5 3.3492 19.62 3.05212 19.86 2.81212C20.0992 2.57295 20.3958 2.45337 20.75 2.45337C21.1042 2.45337 21.4008 2.57295 21.64 2.81212C21.88 3.05212 22 3.3492 22 3.70337V9.95337C22 10.3075 21.88 10.6042 21.64 10.8434C21.4008 11.0834 21.1042 11.2034 20.75 11.2034H14.5C14.1458 11.2034 13.8492 11.0834 13.61 10.8434C13.37 10.6042 13.25 10.3075 13.25 9.95337C13.25 9.5992 13.37 9.30212 13.61 9.06212C13.8492 8.82295 14.1458 8.70337 14.5 8.70337H18.5C17.8333 7.5367 16.9221 6.62004 15.7662 5.95337C14.6096 5.2867 13.3542 4.95337 12 4.95337C9.91667 4.95337 8.14583 5.68254 6.6875 7.14087C5.22917 8.5992 4.5 10.37 4.5 12.4534C4.5 14.5367 5.22917 16.3075 6.6875 17.7659C8.14583 19.2242 9.91667 19.9534 12 19.9534C13.4375 19.9534 14.7658 19.573 15.985 18.8121C17.2033 18.0521 18.1146 17.0367 18.7188 15.7659C18.8229 15.5367 18.995 15.3442 19.235 15.1884C19.4742 15.0317 19.7188 14.9534 19.9688 14.9534C20.4479 14.9534 20.8075 15.12 21.0475 15.4534C21.2867 15.7867 21.3125 16.1617 21.125 16.5784C20.3333 18.3492 19.1146 19.7709 17.4688 20.8434C15.8229 21.9167 14 22.4534 12 22.4534Z"
        fill={color}
      />
    </svg>
  );
};

export const RightArrow = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_274_1714)">
        <path
          d="M8.35535 16.8546L13.0691 11.9937L8.35535 7.13289C7.88155 6.6443 7.88155 5.85503 8.35535 5.36644C8.82916 4.87785 9.59453 4.87785 10.0683 5.36644L15.6446 11.1168C16.1185 11.6054 16.1185 12.3946 15.6446 12.8832L10.0683 18.6336C9.59453 19.1221 8.82916 19.1221 8.35535 18.6336C7.8937 18.145 7.88155 17.3432 8.35535 16.8546Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_274_1714">
          <rect width={width} height={height} fill="white" transform="translate(0 0.453369)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Search = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_284_3915)">
        <path
          d="M15.5006 14.4535H14.7106L14.4306 14.1835C15.6306 12.7835 16.2506 10.8735 15.9106 8.84351C15.4406 6.06351 13.1206 3.84351 10.3206 3.50351C6.09063 2.98351 2.53063 6.54351 3.05063 10.7735C3.39063 13.5735 5.61063 15.8935 8.39063 16.3635C10.4206 16.7035 12.3306 16.0835 13.7306 14.8835L14.0006 15.1635V15.9535L18.2506 20.2035C18.6606 20.6135 19.3306 20.6135 19.7406 20.2035C20.1506 19.7935 20.1506 19.1235 19.7406 18.7135L15.5006 14.4535ZM9.50063 14.4535C7.01063 14.4535 5.00063 12.4435 5.00063 9.95351C5.00063 7.46351 7.01063 5.45351 9.50063 5.45351C11.9906 5.45351 14.0006 7.46351 14.0006 9.95351C14.0006 12.4435 11.9906 14.4535 9.50063 14.4535Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_284_3915">
          <rect width="24" height="24" fill="white" transform="translate(0 0.453369)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Time = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_284_4094)">
        <path
          d="M12 2.45337C6.5 2.45337 2 6.95337 2 12.4534C2 17.9534 6.5 22.4534 12 22.4534C17.5 22.4534 22 17.9534 22 12.4534C22 6.95337 17.5 2.45337 12 2.45337ZM12 20.4534C7.59 20.4534 4 16.8634 4 12.4534C4 8.04337 7.59 4.45337 12 4.45337C16.41 4.45337 20 8.04337 20 12.4534C20 16.8634 16.41 20.4534 12 20.4534ZM12.5 7.45337H11V13.4534L16.2 16.6534L17 15.3534L12.5 12.6534V7.45337Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_284_4094">
          <rect width="24" height="24" fill={color} transform="translate(0 0.453369)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Close = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_284_4124)">
        <path
          d="M12.0007 10.5867L16.2437 6.34372C16.6342 5.95325 17.2673 5.95325 17.6577 6.34372C18.0482 6.73418 18.0482 7.36725 17.6577 7.75772L13.4147 12.0007L17.6577 16.2437C18.0482 16.6342 18.0482 17.2673 17.6577 17.6577C17.2673 18.0482 16.6342 18.0482 16.2437 17.6577L12.0007 13.4147L7.75772 17.6577C7.36725 18.0482 6.73418 18.0482 6.34372 17.6577C5.95325 17.2673 5.95325 16.6342 6.34372 16.2437L10.5867 12.0007L6.34372 7.75772C5.95325 7.36725 5.95325 6.73418 6.34372 6.34372C6.73418 5.95325 7.36725 5.95325 7.75772 6.34372L12.0007 10.5867Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_284_4124">
          <rect width="24" height="24" fill="white" transform="translate(0 0.453369)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Translate = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_290_3570)">
        <path
          d="M16.75 11.6667L20.4167 20.8333H18.6208L17.62 18.3333H14.2117L13.2125 20.8333H11.4175L15.0833 11.6667H16.75ZM9.66667 5V6.66667H14.6667V8.33333H13.0267C12.3839 10.2684 11.3579 12.0542 10.01 13.5842C10.6111 14.1205 11.2631 14.5969 11.9567 15.0067L11.3308 16.5717C10.4354 16.0638 9.598 15.46 8.83333 14.7708C7.34465 16.1181 5.5817 17.1268 3.66583 17.7275L3.21917 16.12C4.8607 15.5966 6.37335 14.7328 7.65833 13.585C6.70724 12.5083 5.91505 11.3011 5.30583 10H7.1725C7.63696 10.8574 8.19389 11.6613 8.83333 12.3975C9.87509 11.1968 10.6961 9.82109 11.2583 8.33417L3 8.33333V6.66667H8V5H9.66667ZM15.9167 14.0708L14.8775 16.6667H16.9542L15.9167 14.0708Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_290_3570">
          <rect width="24" height="24" fill="white" transform="translate(0 0.453369)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Plus = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_294_5631)">
        <path
          d="M12 19.4534C11.4477 19.4534 11 19.0057 11 18.4534V13.4534H6C5.44772 13.4534 5 13.0057 5 12.4534C5 11.9011 5.44772 11.4534 6 11.4534H11V6.45337C11 5.90108 11.4477 5.45337 12 5.45337C12.5523 5.45337 13 5.90108 13 6.45337V11.4534H18C18.5523 11.4534 19 11.9011 19 12.4534C19 13.0057 18.5523 13.4534 18 13.4534H13V18.4534C13 19.0057 12.5523 19.4534 12 19.4534Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_294_5631">
          <rect width="24" height="24" fill="white" transform="translate(0 0.453369)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const DownArrow = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_314_2247)">
        <path
          d="M7.14541 8.35535L12.0063 13.0691L16.8671 8.35535C17.3557 7.88155 18.145 7.88155 18.6336 8.35535C19.1221 8.82916 19.1221 9.59453 18.6336 10.0683L12.8832 15.6446C12.3946 16.1185 11.6054 16.1185 11.1168 15.6446L5.36644 10.0683C4.87785 9.59453 4.87785 8.82916 5.36644 8.35535C5.85503 7.8937 6.65682 7.88155 7.14541 8.35535Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_314_2247">
          <rect width="24" height="24" fill="white" transform="translate(0 0.453369)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ChatBot = ({
  color = "white",
  width = 42,
  height = 47,
}: {
  color: string;
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 42 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.1248 39.875C22.8073 39.875 20.2536 40.8125 17.923 42.0219C14.1767 43.9662 12.3036 44.9394 11.3811 44.3188C10.4586 43.7 10.633 41.7781 10.9836 37.9362L11.0623 37.0625"
        stroke="white"
        stroke-width="3.75"
        stroke-linecap="round"
      />
      <circle cx="13.875" cy="23" r="1.875" fill="white" />
      <circle cx="28.875" cy="23" r="1.875" fill="white" />
      <path
        d="M16.6875 26.75H26.0625C26.0625 28.8211 24.3836 30.5 22.3125 30.5H20.4375C18.3664 30.5 16.6875 28.8211 16.6875 26.75Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.7813 5.74874C23.6219 5.26244 24.1875 4.35352 24.1875 3.3125C24.1875 1.7592 22.9283 0.5 21.375 0.5C19.8217 0.5 18.5625 1.7592 18.5625 3.3125C18.5625 4.35352 19.1281 5.26244 19.9688 5.74874V8.00002H17.4878H17.4878C14.069 7.99997 11.3131 7.99993 9.1457 8.29144C6.8957 8.59406 5.00096 9.24145 3.49668 10.7467C1.99143 12.251 1.34404 14.1457 1.04142 16.3957C0.749913 18.5632 0.749952 21.319 0.750001 24.7377V24.7378V24.7378V25.0122V25.0123V25.0123C0.749952 28.431 0.749913 31.1869 1.04142 33.3543C1.34403 35.6043 1.99139 37.4989 3.49653 39.0032C5.17553 40.6842 7.34044 41.2957 9.9427 41.5499C10.9733 41.6506 11.8904 40.8967 11.9911 39.8661C12.0918 38.8355 11.3379 37.9183 10.3073 37.8177C8.03502 37.5957 6.91897 37.1235 6.14934 36.3527L6.14776 36.3511C5.45592 35.6599 5.00468 34.6889 4.75796 32.8545C4.50399 30.9662 4.50001 28.4634 4.50001 24.875C4.50001 21.2867 4.50399 18.7839 4.75796 16.8956C5.00468 15.0612 5.45705 14.089 6.1489 13.3978C6.84015 12.7059 7.81116 12.2547 9.64556 12.008C11.5339 11.754 14.0367 11.75 17.625 11.75H25.125C28.7133 11.75 31.2161 11.754 33.1044 12.008C34.9388 12.2547 35.911 12.7071 36.6022 13.3989C37.2941 14.0902 37.7453 15.0612 37.992 16.8956C38.246 18.7839 38.25 21.2867 38.25 24.875C38.25 28.4634 38.246 30.9662 37.992 32.8545C37.7453 34.6889 37.293 35.661 36.6011 36.3523C35.9098 37.0441 34.9388 37.4953 33.1044 37.7421C31.2161 37.996 28.7133 38 25.125 38C24.0895 38 23.25 38.8395 23.25 39.875C23.25 40.9106 24.0895 41.75 25.125 41.75H25.2622C28.6809 41.7501 31.4369 41.7501 33.6043 41.4586C35.8546 41.1559 37.7495 40.5084 39.2539 39.0028C40.7587 37.4986 41.406 35.604 41.7086 33.3543C42.0001 31.1869 42.0001 28.431 42 25.0122V24.7378C42.0001 21.3191 42.0001 18.5632 41.7086 16.3957C41.406 14.146 40.7587 12.2514 39.2539 10.7473C37.7495 9.24161 35.8546 8.5941 33.6043 8.29144C31.4369 7.99993 28.681 7.99997 25.2622 8.00002H25.2622H22.7813V5.74874Z"
        fill="white"
      />
    </svg>
  );
};
