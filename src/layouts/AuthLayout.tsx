import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Slider, type SliderItemProps } from '../components/ui/slider';

export function AuthLayout() {
  const thumbnailSliderImage = [
    {
      imagePath: 'bg-01.jpg',
      alterText: 'login',
    },
    {
      imagePath: 'thumbnail1.jpg',
      alterText: 'login',
    },
    {
      imagePath: 'thumbnail2.jpg',
      alterText: 'login',
    },
  ] as SliderItemProps[];

  return (
    <>
      <div className="vh-100 gradient-custom-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4">
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: '#709085' }}
                ></i>
                <span className="h1 fw-bold mb-0 text-l app-text-light">
                  TODO
                </span>
              </div>
              <div className="container">
                {/* Render body here */}
                <Outlet />
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <Slider items={thumbnailSliderImage} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
